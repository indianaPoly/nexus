import React, { createContext, ReactNode, useContext, useState } from "react";

type ModeContextType = {
  mode: "buy" | "sell";
  toggleMode: () => void;
};

const ModeContext = createContext<ModeContextType>({
  mode: "buy",
  toggleMode: () => {},
});

export const ModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  const toggleMode = () => {
    setMode((prev) => (prev === "buy" ? "sell" : "buy"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error("모드에서 에러남");
  }

  return context;
};
