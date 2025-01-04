import { create } from "ipfs-http-client";
import { createContext, ReactNode, useContext } from "react";

const IPFSContext = createContext<any>(null);

export const IPFSProvider = ({ children }: { children: ReactNode }) => {
  const ipfs = create({
    host: "127.0.0.1",
    port: 5001,
    protocol: "http",
  });

  return <IPFSContext.Provider value={ipfs}>{children}</IPFSContext.Provider>;
};

export const useIPFS = () => useContext(IPFSContext);
