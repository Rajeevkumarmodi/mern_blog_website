import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
