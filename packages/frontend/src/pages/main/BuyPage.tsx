import { useEffect, useState } from "react";
import { getETHUSDPrice } from "@/utils/getETHUSDPrice";
import ProductCard from "@/components/buyPage/ProductCard";

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
    // ... (나머지 mockData는 동일)
  ];

  const filteredData = mockData.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-5 text-gray-100">
      {/* Search and Category Filter */}
      <div className="mb-10 flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-2/3 p-4 text-lg rounded-xl border-2 border-blue-500 bg-gray-800/50 text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     shadow-[0_0_15px_rgba(59,130,246,0.5)] 
                     backdrop-blur-sm
                     transition-all duration-300
                     hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-auto p-4 text-lg rounded-xl 
                     border-2 border-purple-500 bg-gray-800/50 
                     text-white focus:outline-none focus:ring-2 
                     focus:ring-purple-500 cursor-pointer
                     shadow-[0_0_15px_rgba(147,51,234,0.5)]
                     backdrop-blur-sm
                     transition-all duration-300
                     hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]"
        >
          <option value="all">All Categories</option>
          <option value="software">Software</option>
          <option value="cloud">Cloud Services</option>
          <option value="ai-services">AI Services</option>
          <option value="data">Data</option>
        </select>
      </div>

      {/* Product List */}
      <div>
        {filteredData.length > 0 ? (
          <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-5 text-gray-100">
            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  fileType={item.fileType}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
