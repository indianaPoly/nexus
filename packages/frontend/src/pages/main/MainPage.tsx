import { useMode } from "@/providers/ModeProvider";
import BuyPage from "./BuyPage";
import SellPage from "./SellPage";

const MainPage = () => {
  const { mode } = useMode();

  return (
    <div className="min-h-screen bg-gray-900 p-5 text-gray-100">
      {mode === "buy" && <BuyPage />}
      {mode === "sell" && <SellPage />}
    </div>
  );
};

export default MainPage;
