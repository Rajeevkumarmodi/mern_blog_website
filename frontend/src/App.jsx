import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<h1>home page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
