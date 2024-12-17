import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getETHUSDPrice } from "@/utils/getETHUSDPrice";
import SellConfirmationModal from "@/components/modal/SellConfirmationModal";

const SellPage = () => {
  const [dataName, setItemName] = useState("");
  const [dataCategory, setDataCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [uploadFile, setUpLoadFile] = useState<File | null>(null);
  const [ethPrice, setEthPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateEthPrice = async () => {
      await getETHUSDPrice();
      const priceData = localStorage.getItem("ethPriceCache");
      if (priceData) {
        const { price } = JSON.parse(priceData);
        setEthPrice(price);
      }
    };
    updateEthPrice();
  }, []);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUpLoadFile(files[0]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataName || !dataCategory || !price || !uploadFile) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 p-8 text-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-pink-500">
        데이터 판매하기
      </h2>

      {/* 판매 정보 입력 */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 데이터명 */}
        <div className="border-b border-gray-700 pb-4">
          <label className="block text-lg font-semibold mb-2">
            데이터 이름
          </label>
          <input
            type="text"
            value={dataName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setItemName(e.target.value)
            }
            placeholder="이름을 입력해주세요."
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          />
        </div>

        {/* 카테고리 */}
        <div className="border-b border-gray-700 pb-4">
          <label className="block text-lg font-semibold mb-2">카테고리</label>
          <select
            value={dataCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setDataCategory(e.target.value)
            }
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          >
            <option value="">카테고리를 선택해주세요.</option>
            <option value="software">소프트웨어</option>
            <option value="cloud">클라우드 서비스</option>
            <option value="ai-services">AI 서비스</option>
            <option value="data">데이터</option>
          </select>
        </div>

        {/* 파일 업로드 */}
        <div className="border-b border-gray-700 pb-4">
          <label className="block text-lg font-semibold mb-2">
            파일 업로드
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full text-gray-400 file:bg-pink-500 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none hover:file:bg-pink-600 transition duration-300"
            accept="*/*"
          />
          {uploadFile && (
            <p className="mt-2 text-sm text-gray-400">
              업로드된 파일: {uploadFile.name}
            </p>
          )}
        </div>

        {/* 가격 */}
        <div className="pb-4">
          <label className="block text-lg font-semibold mb-2">가격 (ETH)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            step="0.000001"
            placeholder="ETH 단위로 가격을 입력하세요"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          />
          {ethPrice > 0 && price > 0 && (
            <p className="mt-2 text-sm text-gray-400">
              예상 가치:{" "}
              <span className="font-semibold text-green-400">
                ${(price * ethPrice).toLocaleString()}
              </span>{" "}
              (USD)
            </p>
          )}
        </div>

        {/* 등록 버튼 */}
        <div className="text-center">
          <button
            type="submit"
            className="w-2/3 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg transition-transform duration-300 hover:scale-105"
          >
            상품 등록하기
          </button>
        </div>
      </form>

      {/* 모달 */}
      <SellConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dataName={dataName}
        dataCategory={dataCategory}
        price={price}
        file={uploadFile}
      />
    </div>
  );
};

export default SellPage;
