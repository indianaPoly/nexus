import { useState } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Nexus from "@/assets/icons/nexus.svg";
import { useMode } from "@/providers/ModeProvider";

const Header = () => {
  const { mode, toggleMode } = useMode();
  const { address, isConnecting, isDisconnected } = useAccount();

  // Logo gradient based on mode
  const logoGradient =
    mode === "sell"
      ? "from-pink-400 to-purple-400"
      : "from-cyan-400 to-blue-400";

  // Logo shadow based on mode
  const logoShadow =
    mode === "sell"
      ? "[text-shadow:0_0_20px_rgba(236,72,153,0.3)]"
      : "[text-shadow:0_0_20px_rgba(6,182,212,0.3)]";

  // Icon border and shadow based on mode
  const iconBorderColor =
    mode === "sell" ? "border-pink-500/30" : "border-cyan-500/30";

  const iconShadow =
    mode === "sell"
      ? "shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]"
      : "shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]";

  // Hover gradient based on mode
  const hoverGradient =
    mode === "sell"
      ? "from-pink-400 to-purple-500"
      : "from-cyan-400 to-blue-500";

  return (
    <header className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 p-5 backdrop-blur-md"></div>

      <div className="relative flex justify-between items-center p-6 border-b border-purple-500/30">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div
              className={`w-12 h-12 flex items-center justify-center bg-gray-800 rounded-xl 
                        border ${iconBorderColor}
                        group-hover:scale-110 
                        transition-all duration-300
                        ${iconShadow}`}
            >
              <img src={Nexus} alt="Nexus Logo" className="w-8 h-8" />
            </div>
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${hoverGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            ></div>
          </div>
          <span
            className={`text-2xl font-bold bg-gradient-to-r ${logoGradient} bg-clip-text text-transparent
                     transition-all duration-500 ${logoShadow}`}
          >
            Nexus
          </span>
        </div>

        {/* Rest of the header content remains the same */}
        <div className="flex items-center space-x-8">
          {address && (
            <button
              className={`flex items-center rounded-xl px-1 py-0.5 relative cursor-pointer w-28 h-10 
                       transition-all duration-300 
                       shadow-[0_0_15px_rgba(236,72,153,0.3)]
                       hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]
                       border border-pink-500/30
                       backdrop-blur-sm
                       ${
                         mode === "sell" ? "bg-pink-500/20" : "bg-blue-500/20"
                       }`}
              onClick={toggleMode}
            >
              {/* Button content remains the same */}
              <div
                className={`absolute left-0 w-1/2 h-full bg-gradient-to-r 
                         ${
                           mode === "sell"
                             ? "from-pink-500 to-purple-500"
                             : "from-blue-500 to-cyan-500"
                         } 
                         rounded-xl shadow-md transition-transform duration-300 ease-in-out 
                         ${
                           mode === "sell"
                             ? "translate-x-full"
                             : "translate-x-0"
                         }`}
              />
              <span
                className={`z-10 w-1/2 text-center text-sm font-bold transition-colors duration-300 
                         ${mode === "buy" ? "text-white" : "text-gray-400"}`}
              >
                Buy
              </span>
              <span
                className={`z-10 w-1/2 text-center text-sm font-bold transition-colors duration-300 
                         ${mode === "sell" ? "text-white" : "text-gray-400"}`}
              >
                Sell
              </span>
            </button>
          )}

          {/* Connection status remains the same */}
          <div
            className="flex items-center space-x-3 px-4 py-2 rounded-xl 
                       bg-gray-800/30 border border-purple-500/30 
                       backdrop-blur-sm"
          >
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full 
                         animate-pulse
                         ${
                           isConnecting
                             ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                             : isDisconnected
                             ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                             : "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                         }`}
              ></div>
              <div
                className={`absolute inset-0 rounded-full 
                         ${
                           isConnecting
                             ? "bg-yellow-400"
                             : isDisconnected
                             ? "bg-red-500"
                             : "bg-green-500"
                         }
                         animate-ping opacity-20`}
              ></div>
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {isConnecting
                ? "Connecting..."
                : isDisconnected
                ? "Disconnected"
                : "Connected"}
            </span>
          </div>

          <div
            className="transform hover:scale-105 transition-all duration-300
                       rounded-xl overflow-hidden
                       shadow-[0_0_15px_rgba(6,182,212,0.3)]
                       hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
          >
            <ConnectKitButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
