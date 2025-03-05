// src/components/BankList.jsx
import React from "react";

function BankList({
  bank1,
  bank2,
  bank3,
  bank4,
  bank5,
  bank6,
  bank7,
  bank8,
  bank9,
  bank10
}) {
  return (
    <div>
      <h2>Bank List</h2>
      <ul>
        <li key={bank1.id}>
          {bank1.name} - {bank1.location}
        </li>
        <li key={bank2.id}>
          {bank2.name} - {bank2.location}
        </li>
        <li key={bank3.id}>
          {bank3.name} - {bank3.location}
        </li>
        <li key={bank4.id}>
          {bank4.name} - {bank4.location}
        </li>
        <li key={bank5.id}>
          {bank5.name} - {bank5.location}
        </li>
        <li key={bank6.id}>
          {bank6.name} - {bank6.location}
        </li>
        <li key={bank7.id}>
          {bank7.name} - {bank7.location}
        </li>
        <li key={bank8.id}>
          {bank8.name} - {bank8.location}
        </li>
        <li key={bank9.id}>
          {bank9.name} - {bank9.location}
        </li>
        <li key={bank10.id}>
          {bank10.name} - {bank10.location}
        </li>
      </ul>
    </div>
  );
}

export default BankList;
