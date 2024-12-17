import { useMode } from "@/providers/ModeProvider";
import { useState } from "react";

const MainPage = () => {
  const { mode } = useMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const mockData = [
    { id: 1, name: "Data Analytics Tool", category: "software", price: 500 },
    { id: 2, name: "Cloud Storage Service", category: "cloud", price: 200 },
    {
      id: 3,
      name: "AI Model Subscription",
      category: "ai-services",
      price: 300,
    },
    { id: 4, name: "E-commerce Dashboard", category: "software", price: 400 },
    { id: 5, name: "Virtual Machine Hosting", category: "cloud", price: 250 },
    {
      id: 6,
      name: "Data Visualization Toolkit",
      category: "software",
      price: 350,
    },
    {
      id: 7,
      name: "AI Content Generator",
      category: "ai-services",
      price: 450,
    },
    {
      id: 8,
      name: "Business Intelligence Reports",
      category: "data",
      price: 150,
    },
    { id: 9, name: "Customer Data Platform", category: "data", price: 600 },
    {
      id: 10,
      name: "Predictive Analytics Suite",
      category: "ai-services",
      price: 700,
    },
  ];

  const filteredData = mockData.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-5 text-gray-100">
      {mode === "buy" && (
        <div>
          <div className="mb-6 flex justify-center items-center">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-2/3 p-3 text-lg rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 text-lg rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">전체</option>
              <option value="software">소프트웨어</option>
              <option value="cloud">클라우드 서비스</option>
              <option value="ai-services">AI 서비스</option>
              <option value="data">데이터</option>
            </select>
          </div>
          <div>
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-1">
                      카테고리: {item.category}
                    </p>
                    <p className="text-lg font-bold mb-4">
                      가격: ${item.price}
                    </p>
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
      )}
      {mode === "sell" && (
        <p className="text-center text-2xl font-semibold">
          판매 페이지 입니다.
        </p>
      )}
    </div>
  );
};

export default MainPage;
