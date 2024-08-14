import React, { useState } from "react";
import { createContext } from "react";

export const contex = createContext();

function ContexApi({ children }) {
  const blogCategories = [
    "All",
    "Tech",
    "Health",
    "Fitness",
    "Lifestyle",
    "Business",
    "Education",
    "Finance",
    "Marketing",
    "Sports",
    "Internet Services",
  ];
  const [loader, setLoader] = useState(false);

  const [isOpenManu, setIsOpenManu] = useState(false);
  const [isPresentToken, setIsPresentToken] = useState(false);
  return (
    <contex.Provider
      value={{
        loader,
        setLoader,
        blogCategories,
        isOpenManu,
        setIsOpenManu,
        isPresentToken,
        setIsPresentToken,
      }}
    >
      {children}
    </contex.Provider>
  );
}

export default ContexApi;
