import React from "react";

function SearchBox({ searchValue }) {
  function search(e) {
    searchValue(e);
  }

  return (
    <div>
      <input
        onChange={(e) => search(e)}
        className="border-y-2 border-l-2 border-gray-300 outline-none  rounded-s-lg p-1"
        type="text"
        placeholder="search blog"
      />
      <button className="bg-blue-500 font-bold text-white py-[6px] px-2 rounded-e-lg">
        Search
      </button>
    </div>
  );
}

export default SearchBox;
