import React from "react";
import BankList from "../BankList";

function Banks() {
  const banks = [
    { id: 1, name: "Nepal Rastra Bank", location: "Kathmandu" },
    { id: 2, name: "Agricultural Development Bank", location: "Kathmandu" },
    { id: 3, name: "Nabil Bank", location: "Kathmandu" },
    { id: 4, name: "Himalayan Bank", location: "Kathmandu" },
    { id: 5, name: "Standard Chartered Bank Nepal", location: "Kathmandu" },
    { id: 6, name: "Kumari Bank", location: "Kathmandu" },
    { id: 7, name: "Shree Harsha Bank", location: "Pokhara" },
    { id: 8, name: "Global IME Bank", location: "Kathmandu" },
    { id: 9, name: "Machhapuchhre Bank", location: "Pokhara" },
    { id: 10, name: "Everest Bank", location: "Kathmandu" }
  ];

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">List of Nepali Banks</h1>
      <div className="bank-list-container">
        <BankList banks={banks} />
      </div>
    </div>
  );
}

export default Banks;
