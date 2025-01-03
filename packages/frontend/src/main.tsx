import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "./providers/Web3Provider";
import { IPFSProvider } from "./providers/IPFSProvider";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3Provider>
        <IPFSProvider>
          <App />
        </IPFSProvider>
      </Web3Provider>
    </BrowserRouter>
  </React.StrictMode>
);
