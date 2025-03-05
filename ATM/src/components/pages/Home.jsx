import React from "react";

const colleges = [
  { id: 1, name: "State University", location: "City A", fee: "$8,000/year" },
  { id: 2, name: "Technical Institute", location: "City B", fee: "$12,000/year" },
  { id: 3, name: "Arts College", location: "City C", fee: "$9,500/year" }
];

const Home = ({ searchQuery }) => {
  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold">Find Your Perfect College</h1>
      <div className="mt-4">
        {filteredColleges.length > 0 ? (
          filteredColleges.map(college => (
            <div key={college.id} className="border p-4 rounded-md shadow-md mt-4">
              <h2 className="text-xl font-bold">{college.name}</h2>
              <p>Location: {college.location}</p>
              <p>Fee: {college.fee}</p>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-red-500">No colleges found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
