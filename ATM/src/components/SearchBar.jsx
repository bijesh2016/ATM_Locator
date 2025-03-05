import React from "react";

const SearchBar = () => {
  return (
    <div className="text-center my-10">
      <h2 className="text-2xl font-bold">Find Your Perfect College</h2>
      <p className="text-gray-600">Discover colleges that match your preferences and location</p>
      <div className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Enter location or city"
          className="border p-2 rounded-l w-80"
        />
        <button className="bg-blue-500 text-white px-4 rounded-r">Search Colleges</button>
      </div>
    </div>
  );
};

export default SearchBar;
