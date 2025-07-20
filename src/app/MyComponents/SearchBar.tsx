
"use client";
import React from "react";
import { useMyContext } from "../context/ModalContext";

const SearchBar = () => {

  const {searchTerm , setSearchTerm} = useMyContext();

  return (
    <div className=" h-16 p-4 w-full sm:w-3/4 flex flex-nowrap space-x-1 items-center">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search By Title or Description..."
        className="h-8 w-full p-2 rounded-2xl bg-white text-black border-1 border-orange-800"
      />
    </div>
  );
};


export default SearchBar;