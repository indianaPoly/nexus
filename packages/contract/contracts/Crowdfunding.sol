// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract Crowdfunding {
    IERC20 public paymentToken;
    address public owner;

    // 프로젝트 상태를 추적하기 위한 열거형
    enum ProjectStatus {
        Active, // 진행중
        Completed, // 목표 달성
        Failed, // 기한 내 목표 미달성
        Cancelled // 취소됨
    }

    // 마일스톤 구조체
    struct Milestone {
        string description;
        uint256 targetAmount;
        uint256 deadline;
        bool isCompleted;
        bool fundsReleased;
        string progressUpdate; // 진행상황 업데이트
    }

    struct Company {
        address companyAddress;
        string companyName;
        string description;
        bool isRegistered;
    }

    struct FundingProject {
        Company company;
        string projectName;
        string description;
        uint256 targetAmount;
        uint256 deadline;
        uint256 totalFunded;
        ProjectStatus status;
        Milestone[] milestones;
        uint256 currentMilestone;
        mapping(address => uint256) contributions;
    }

    uint256 public projectTotalCount = 0;

    // 프로젝트 ID를 통한 접근을 위해 매핑 수정
    mapping(address => Company) public companies;
    mapping(uint256 => FundingProject) public projects;

    // 이벤트 정의
    event CompanyRegistered(address indexed companyAddress, string companyName);
    event ProjectCreated(
        uint256 indexed projectId,
        string projectName,
        address company
    );
    event FundingReceived(
        uint256 indexed projectId,
        address indexed funder,
        uint256 amount
    );
    event MilestoneCompleted(uint256 indexed projectId, uint256 milestoneIndex);
    event ProgressUpdated(
        uint256 indexed projectId,
        uint256 milestoneIndex,
        string update
    );
    event FundsReleased(
        uint256 indexed projectId,
        uint256 milestoneIndex,
        uint256 amount
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyCompany(uint256 _projectId) {
        require(
            projects[_projectId].company.isRegistered,
            "Company not registered"
        );
        _;
    }

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
        owner = msg.sender;
    }

    function registerCompany(
        string memory _companyName,
        string memory _description
    ) external {
        require(bytes(_companyName).length > 0, "Company name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(
            !companies[msg.sender].isRegistered,
            "Company already registered"
        );

        companies[msg.sender] = Company({
            companyAddress: msg.sender,
            companyName: _companyName,
            description: _description,
            isRegistered: true
        });

        emit CompanyRegistered(msg.sender, _companyName);
    }

    function createCrowdFundingProject(
        string memory _projectName,
        string memory _description,
        uint256 _targetAmount,
        uint256 _duration,
        Milestone[] memory _milestones
    ) external {
        require(bytes(_projectName).length > 0, "Project name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_targetAmount > 0, "Target amount must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");
        require(_milestones.length > 0, "Must have at least one milestone");
        require(companies[msg.sender].isRegistered, "Company not registered");

        uint256 projectId = projectTotalCount++;
        FundingProject storage newProject = projects[projectId];

        newProject.company = companies[msg.sender];
        newProject.projectName = _projectName;
        newProject.description = _description;
        newProject.targetAmount = _targetAmount;
        newProject.deadline = block.timestamp + _duration;
        newProject.totalFunded = 0;
        newProject.status = ProjectStatus.Active;
        newProject.currentMilestone = 0;

        for (uint i = 0; i < _milestones.length; i++) {
            newProject.milestones.push(
                Milestone({
                    description: _milestones[i].description,
                    targetAmount: _milestones[i].targetAmount,
                    deadline: _milestones[i].deadline,
                    isCompleted: false,
                    fundsReleased: false,
                    progressUpdate: ""
                })
            );
        }

        emit ProjectCreated(projectId, _projectName, msg.sender);
    }

    function contributeFunds(uint256 _projectId, uint256 _amount) external {
        FundingProject storage project = projects[_projectId];

        require(
            project.status == ProjectStatus.Active,
            "Project is not active"
        );
        require(
            block.timestamp < project.deadline,
            "Project deadline has passed"
        );

        require(
            paymentToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        project.contributions[msg.sender] += _amount;
        project.totalFunded += _amount;

        emit FundingReceived(_projectId, msg.sender, _amount);

        if (project.totalFunded >= project.targetAmount) {
            project.status = ProjectStatus.Completed;
        }
    }

    function updateMilestoneProgress(
        uint256 _projectId,
        uint256 _milestoneIndex,
        string memory _progressUpdate
    ) external onlyCompany(_projectId) {
        FundingProject storage project = projects[_projectId];
        require(
            _milestoneIndex < project.milestones.length,
            "Invalid milestone index"
        );
        require(
            !project.milestones[_milestoneIndex].isCompleted,
            "Milestone already completed"
        );

        project.milestones[_milestoneIndex].progressUpdate = _progressUpdate;
        emit ProgressUpdated(_projectId, _milestoneIndex, _progressUpdate);
    }

    function completeMilestone(
        uint256 _projectId,
        uint256 _milestoneIndex
    ) external onlyOwner {
        FundingProject storage project = projects[_projectId];
        require(
            _milestoneIndex < project.milestones.length,
            "Invalid milestone index"
        );
        require(
            !project.milestones[_milestoneIndex].isCompleted,
            "Milestone already completed"
        );

        Milestone storage milestone = project.milestones[_milestoneIndex];
        milestone.isCompleted = true;

        uint256 releaseAmount = milestone.targetAmount;
        require(
            paymentToken.transferFrom(
                address(this),
                project.company.companyAddress,
                releaseAmount
            ),
            "Fund release failed"
        );

        milestone.fundsReleased = true;
        project.currentMilestone = _milestoneIndex + 1;

        emit MilestoneCompleted(_projectId, _milestoneIndex);
        emit FundsReleased(_projectId, _milestoneIndex, releaseAmount);
    }

    function getProjectDetails(
        uint256 _projectId
    )
        external
        view
        returns (
            string memory projectName,
            string memory description,
            uint256 targetAmount,
            uint256 totalFunded,
            uint256 deadline,
            ProjectStatus status,
            uint256 currentMilestone
        )
    {
        FundingProject storage project = projects[_projectId];
        return (
            project.projectName,
            project.description,
            project.targetAmount,
            project.totalFunded,
            project.deadline,
            project.status,
            project.currentMilestone
        );
    }

    function getMilestoneDetails(
        uint256 _projectId,
        uint256 _milestoneIndex
    )
        external
        view
        returns (
            string memory description,
            uint256 targetAmount,
            uint256 deadline,
            bool isCompleted,
            bool fundsReleased,
            string memory progressUpdate
        )
    {
        FundingProject storage project = projects[_projectId];
        Milestone storage milestone = project.milestones[_milestoneIndex];
        return (
            milestone.description,
            milestone.targetAmount,
            milestone.deadline,
            milestone.isCompleted,
            milestone.fundsReleased,
            milestone.progressUpdate
        );
    }
}
