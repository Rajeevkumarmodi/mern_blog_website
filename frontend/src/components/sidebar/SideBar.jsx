import React, { useContext } from "react";
import { contex } from "../../contex/ContexApi";
import SearchBox from "../searchBox/SearchBox";

function SideBar() {
  const { blogCategories } = useContext(contex);
  console.log(blogCategories);
  return (
    <div className="py-2 flex flex-col items-center w-[300px] h-[calc(100vh-53px)] bg-[#286082] fixed">
      <SearchBox />
      <div>
        {blogCategories &&
          blogCategories.map((categ) => {
            return (
              <p className="my-2 py-[2px] rounded-lg w-[200px] text-center hover:bg-orange-500 text-white border-2 cursor-pointer">
                {categ}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default SideBar;
