import React, { useState } from "react";
import { createContext } from "react";

export const contex = createContext();

function ContexApi({ children }) {
  const [loader, setLoader] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <contex.Provider
      value={{ loader, setLoader, isSignup, setIsSignup, isLogin, setIsLogin }}
    >
      {children}
    </contex.Provider>
  );
}

export default ContexApi;
