import React from "react";

function BankList({ banks }) {
  return (
    <div className="list-group">
      {banks.map((bank) => (
        <div key={bank.id} className="list-group-item list-group-item-action">
          <h5>{bank.name}</h5>
          <p>Location: {bank.location}</p>
        </div>
      ))}
    </div>
  );
}

export default BankList;
