import { useEffect, useState } from "react";
import { getETHUSDPrice } from "@/utils/getETHUSDPrice";

const BuyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [ethPrice, setEthPrice] = useState(0);

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

  const mockData = [
    {
      id: 1,
      name: "Data Analytics Tool",
      category: "software",
      price: 0.25,
      fileType: "zip",
    },
    {
      id: 2,
      name: "Cloud Storage Service",
      category: "cloud",
      price: 0.1,
      fileType: "tar.gz",
    },
    {
      id: 3,
      name: "AI Model Subscription",
      category: "ai-services",
      price: 0.15,
      fileType: "h5",
    },
    {
      id: 4,
      name: "E-commerce Dashboard",
      category: "software",
      price: 0.2,
      fileType: "pdf",
    },
    {
      id: 5,
      name: "Virtual Machine Hosting",
      category: "cloud",
      price: 0.12,
      fileType: "ova",
    },
    {
      id: 6,
      name: "Data Visualization Toolkit",
      category: "software",
      price: 0.175,
      fileType: "exe",
    },
    {
      id: 7,
      name: "AI Content Generator",
      category: "ai-services",
      price: 0.225,
      fileType: "json",
    },
    {
      id: 8,
      name: "Business Intelligence Reports",
      category: "data",
      price: 0.075,
      fileType: "xlsx",
    },
    {
      id: 9,
      name: "Customer Data Platform",
      category: "data",
      price: 0.3,
      fileType: "csv",
    },
    {
      id: 10,
      name: "Predictive Analytics Suite",
      category: "ai-services",
      price: 0.35,
      fileType: "onnx",
    },
  ];

  const filteredData = mockData.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-5 text-gray-100">
      {/* 검색 및 카테고리 필터 */}
      <div className="mb-6 flex justify-center items-center">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-2/3 p-3 text-lg rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 text-lg rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">전체</option>
          <option value="software">소프트웨어</option>
          <option value="cloud">클라우드 서비스</option>
          <option value="ai-services">AI 서비스</option>
          <option value="data">데이터</option>
        </select>
      </div>

      {/* 상품 리스트 */}
      <div>
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 text-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-400 mb-1">
                  카테고리:{" "}
                  <span className="text-gray-200">{item.category}</span>
                </p>
                <p className="text-gray-400 mb-1">
                  파일 형태:{" "}
                  <span className="text-gray-200">{item.fileType}</span>
                </p>
                <p className="text-lg font-bold mb-2 text-blue-400">
                  가격: {item.price.toFixed(4)} ETH
                </p>
                {ethPrice > 0 && (
                  <p className="text-sm text-gray-400 mb-4">
                    ≈ ${(item.price * ethPrice || 0).toLocaleString()}
                  </p>
                )}
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  구매하기
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
