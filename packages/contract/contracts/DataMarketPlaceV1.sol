// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract DataMarketPlaceV1 {
    IERC20 public paymentToken;
    address public owner;
    uint256 public feePercentage = 5;

    mapping(address => bytes32[]) private userRegisteredData; // 사용자별 등록 CID
    mapping(bytes32 => mapping(address => bool)) private accessControl; // 데이터 접근 권한
    mapping(address => bytes32[]) private userPurchasedData; // 구매한 데이터 CID

    event DataRegistered(address indexed user, bytes32 cidHash, uint256 price);
    event DataPurchased(address indexed buyer, bytes32 cidHash, uint256 price);

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
        owner = msg.sender;
    }

    modifier onlyOnwer() {
        require(owner == msg.sender, "Not the contract owner");
        _;
    }

    // 수수료 비율 설정
    function setFeePercentage(uint256 _feePercentage) external onlyOnwer {
        require(
            _feePercentage >= 0 && _feePercentage <= 100,
            "Fee percentage greater than 0 and smaller than 100"
        );

        feePercentage = _feePercentage;
    }

    // data register funciton
    function registerCID(bytes32 cidHash, uint256 price) external {
        require(cidHash != bytes32(0), "CID cannot be empty");
        require(price > 0, "Price must be greater than 0");

        userRegisteredData[msg.sender].push(cidHash);
        accessControl[cidHash][msg.sender] = true;

        emit DataRegistered(msg.sender, cidHash, price);
    }

    // data purchase function
    function purchaseData(
        bytes32 cidHash,
        address seller,
        uint256 price
    ) external {
        require(
            accessControl[cidHash][msg.sender] == false,
            "Already purchased"
        );

        require(paymentToken.balanceOf(msg.sender) >= price, "not empty token");

        uint256 fee = (price * feePercentage) / 100;
        uint256 sellerAmount = price = fee;

        require(
            paymentToken.transferFrom(msg.sender, owner, fee),
            "Fee transfer failed"
        );

        require(
            paymentToken.transferFrom(msg.sender, seller, sellerAmount),
            "Payment failed"
        );

        accessControl[cidHash][msg.sender] = true;
        userPurchasedData[msg.sender].push(cidHash);

        emit DataPurchased(msg.sender, cidHash, price);
    }

    // 자신이 등록한 데이터를 반환
    function getMyRegisteredData() external view returns (bytes32[] memory) {
        return userRegisteredData[msg.sender];
    }

    // 자신이 구매한 데이터 반환
    function getMyPurchasedData() external view returns (bytes32[] memory) {
        return userPurchasedData[msg.sender];
    }
}
