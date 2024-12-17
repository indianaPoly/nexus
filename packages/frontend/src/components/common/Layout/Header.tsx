import { useState } from "react";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

import Nexus from "@/assets/icons/nexus.svg";
import { useMode } from "@/providers/ModeProvider";

const Header = () => {
  const { mode, toggleMode } = useMode();
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <header className="flex justify-between items-center p-6 bg-gray-900 text-white shadow-md w-full">
      <div className="flex items-center space-x-4">
        <div className="relative group">
          {/* Logo with Hover Effect */}
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full group-hover:scale-110 transition-transform duration-300">
            <img src={Nexus} alt="Nexus Logo" className="w-8 h-8" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        <span className="text-xl font-semibold">Nexus</span>
      </div>

      <div className="flex items-center space-x-6">
        {address && (
          <button
            className={`flex items-center rounded-full px-1 py-0.5 relative cursor-pointer w-24 h-8 transition-colors duration-300 ${
              mode === "sell" ? "bg-pink-500" : "bg-blue-500"
            }`}
            onClick={toggleMode}
          >
            <div
              className={`absolute left-0 w-1/2 opacity-15 h-full bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                mode === "sell" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <span
              className={`z-10 w-1/2 text-center text-sm font-semibold transition-colors duration-300 ${
                mode === "buy" ? "text-white" : "text-gray-100"
              }`}
            >
              Buy
            </span>
            <span
              className={`z-10 w-1/2 text-center text-sm font-semibold transition-colors duration-300 ${
                mode === "sell" ? "text-white" : "text-gray-100"
              }`}
            >
              Sell
            </span>
          </button>
        )}

        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnecting
                ? "bg-yellow-400"
                : isDisconnected
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          ></div>
          <span className="text-sm font-medium">
            {isConnecting
              ? "Connecting..."
              : isDisconnected
              ? "Disconnected"
              : "Connected"}
          </span>
        </div>

        <div className="hover:scale-105 transition-transform duration-300">
          <ConnectKitButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
