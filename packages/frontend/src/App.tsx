import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import MainPage from "./pages/main/MainPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
