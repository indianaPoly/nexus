import { ModeProvider } from "@/providers/ModeProvider";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ModeProvider>
      <div className="min-w-[380px] h-[100vh] text-white">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </ModeProvider>
  );
};

export default Layout;
