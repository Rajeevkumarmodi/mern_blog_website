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
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isBlogCreated, setIsBlogCreated] = useState(false);
  const [isEditBlog, setIsEditBlog] = useState(false);
  const [isOpenManu, setIsOpenManu] = useState(false);
  return (
    <contex.Provider
      value={{
        loader,
        setLoader,
        isSignup,
        setIsSignup,
        isLogin,
        setIsLogin,
        blogCategories,
        isOpenManu,
        setIsOpenManu,
        setIsBlogCreated,
        isBlogCreated,
        isEditBlog,
        setIsEditBlog,
      }}
    >
      {children}
    </contex.Provider>
  );
}

export default ContexApi;
