import React, { useState } from "react";
import { createContext } from "react";

export const contex = createContext();

function ContexApi({ children }) {
  const [loader, setLoader] = useState(true);
  return (
    <contex.Provider value={{ loader, setLoader }}>{children}</contex.Provider>
  );
}

export default ContexApi;
