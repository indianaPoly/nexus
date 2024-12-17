import Modal from "../common/Modal/Modal";

type SellConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dataName: string;
  dataCategory: string;
  price: number;
  file?: File | null;
};

const SellConfirmationModal = ({
  isOpen,
  onClose,
  dataName,
  dataCategory,
  price,
  file,
}: SellConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-6 bg-gray-900 text-gray-300 rounded-lg shadow-2xl relative">
        {/* 주의사항 */}
        <div className="mb-6 p-4 bg-gray-800 border-l-4 border-yellow-400 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center justify-center gap-2">
            주의사항
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              상품을 등록하면{" "}
              <span className="text-yellow-300 font-semibold">가스비</span>가
              발생해요.
            </li>
            <li>
              데이터 검증 과정에{" "}
              <span className="text-yellow-300 font-semibold">시간이 소요</span>
              되요.
            </li>
            <li>
              <span className="text-yellow-300 font-semibold">
                부적절한 데이터
              </span>
              는 등록이 안돼요.
            </li>
            <li>
              <span className="text-yellow-300 font-semibold">
                민감한 데이터
              </span>
              는 업로드하지 마세요.
            </li>
            <li>
              거래 시{" "}
              <span className="text-yellow-300 font-semibold">10% 수수료</span>
              가 차감되어 입금돼요.
            </li>
          </ul>
        </div>

        {/* 상품 정보 */}
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          상품 등록 확인
        </h2>
        <div className="mb-6 space-y-2">
          <p>
            <span className="font-semibold text-gray-400">상품명:</span>{" "}
            <span className="text-gray-100">{dataName}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-400">카테고리:</span>{" "}
            <span className="text-gray-100">{dataCategory}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-400">가격:</span>{" "}
            <span className="text-blue-400 font-bold">{price} ETH</span>
          </p>
          {file && (
            <p>
              <span className="font-semibold text-gray-400">
                업로드된 파일:
              </span>{" "}
              <span className="text-gray-100">{file.name}</span>
            </p>
          )}
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={() => {
            console.log({ dataName, dataCategory, price, file });
            onClose();
          }}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default SellConfirmationModal;
