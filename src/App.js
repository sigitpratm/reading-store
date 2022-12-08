import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./views/Home";
import MasterData from "./views/MasterData";
import DetailData from "./views/DetailData";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailData />} />
        <Route path="/master-data" element={<MasterData />} />
      </Routes>
    </>
  );
}

export default App;
