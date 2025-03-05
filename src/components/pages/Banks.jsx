import React from "react";
import BankList from "../BankList";

function Banks() {
  // Static list of Nepali banks
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
    <div>
      <h1>List of Nepali Banks</h1>
      <BankList
        bank1={banks[0]}
        bank2={banks[1]}
        bank3={banks[2]}
        bank4={banks[3]}
        bank5={banks[4]}
        bank6={banks[5]}
        bank7={banks[6]}
        bank8={banks[7]}
        bank9={banks[8]}
        bank10={banks[9]}
      />
    </div>
  );
}

export default Banks;
