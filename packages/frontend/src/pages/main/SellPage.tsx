import React, { useState, useEffect } from "react";
import { getETHUSDPrice } from "@/utils/getETHUSDPrice";
import SellConfirmationModal from "@/components/modal/SellConfirmationModal";
import UploadFile from "@/components/sellPage/UploadFile";

const SellPage = () => {
  const [dataName, setItemName] = useState("");
  const [dataCategory, setDataCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileCID, setFileCID] = useState<string | null>(null);
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

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    setFileCID(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataName || !dataCategory || !price || !selectedFile) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div
        className="max-w-3xl mx-auto backdrop-blur-lg bg-gray-800/30 p-8 rounded-2xl 
                    shadow-[0_0_30px_rgba(236,72,153,0.3)]
                    border border-pink-500/30"
      >
        <h2
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 
                     bg-clip-text text-transparent 
                     [text-shadow:0_0_30px_rgba(236,72,153,0.5)]"
        >
          Register Your Digital Assets
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Data Name */}
          <div
            className="group relative border-b border-gray-700/50 pb-6 
                       transition-all duration-300
                       hover:border-pink-500/50"
          >
            <label
              className="block text-lg font-semibold mb-2 
                          bg-gradient-to-r from-pink-400 to-purple-400 
                          bg-clip-text text-transparent"
            >
              Data Name
            </label>
            <input
              type="text"
              value={dataName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter your data name"
              className="w-full p-4 bg-gray-800/50 text-white rounded-xl 
                      border-2 border-gray-700/50 
                      focus:outline-none focus:ring-2 focus:ring-pink-500 
                      focus:border-transparent
                      shadow-[0_0_10px_rgba(236,72,153,0.2)]
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                      backdrop-blur-sm"
              required
            />
          </div>

          {/* Category */}
          <div
            className="group relative border-b border-gray-700/50 pb-6
                       transition-all duration-300
                       hover:border-pink-500/50"
          >
            <label
              className="block text-lg font-semibold mb-2 
                          bg-gradient-to-r from-pink-400 to-purple-400 
                          bg-clip-text text-transparent"
            >
              Category
            </label>
            <select
              value={dataCategory}
              onChange={(e) => setDataCategory(e.target.value)}
              className="w-full p-4 bg-gray-800/50 text-white rounded-xl 
                      border-2 border-gray-700/50 
                      focus:outline-none focus:ring-2 focus:ring-pink-500 
                      focus:border-transparent
                      shadow-[0_0_10px_rgba(236,72,153,0.2)]
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                      backdrop-blur-sm
                      cursor-pointer"
              required
            >
              <option value="">Select category</option>
              <option value="software">Software</option>
              <option value="cloud">Cloud Services</option>
              <option value="ai-services">AI Services</option>
              <option value="data">Data</option>
            </select>
          </div>

          {/* File Upload */}
          <div
            className="group relative border-b border-gray-700/50 pb-6
                       transition-all duration-300
                       hover:border-pink-500/50"
          >
            <UploadFile onFileSelected={handleFileSelected} />
          </div>

          {/* Price */}
          <div className="group relative pb-6">
            <label
              className="block text-lg font-semibold mb-2 
                          bg-gradient-to-r from-pink-400 to-purple-400 
                          bg-clip-text text-transparent"
            >
              Price (ETH)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              step="0.000001"
              placeholder="Enter price in ETH"
              className="w-full p-4 bg-gray-800/50 text-white rounded-xl 
                      border-2 border-gray-700/50 
                      focus:outline-none focus:ring-2 focus:ring-pink-500 
                      focus:border-transparent
                      shadow-[0_0_10px_rgba(236,72,153,0.2)]
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]
                      backdrop-blur-sm"
              required
            />
            {ethPrice > 0 && price > 0 && (
              <p className="mt-3 text-base">
                Estimated value:{" "}
                <span
                  className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 
                              bg-clip-text text-transparent"
                >
                  ${(price * ethPrice).toLocaleString()}
                </span>{" "}
                <span className="text-gray-400">(USD)</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="relative overflow-hidden w-2/3 py-4 
                      rounded-xl bg-gradient-to-r from-pink-500 to-purple-500
                      text-white text-lg font-bold
                      transition-all duration-300
                      hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
                      transform hover:scale-105
                      before:content-['']
                      before:absolute
                      before:inset-0
                      before:bg-gradient-to-r
                      before:from-transparent
                      before:via-white/20
                      before:to-transparent
                      before:-translate-x-full
                      hover:before:translate-x-full
                      before:transition-transform
                      before:duration-700"
            >
              Register Asset
            </button>
          </div>
        </form>

        {/* Modal */}
        <SellConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dataName={dataName}
          dataCategory={dataCategory}
          price={price}
          file={selectedFile}
        />
      </div>
    </div>
  );
};

export default SellPage;
