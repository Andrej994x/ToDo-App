import React, { useState } from "react";
import "./PageTitle.css";
import { IoMdAdd } from "react-icons/io";

const weekdays = new Array(7);
weekdays[0] = 'Sunday';
weekdays[1] = 'Monday';
weekdays[2] = 'Tuesday';
weekdays[3] = 'Wednesday';
weekdays[4] = 'Thursday';
weekdays[5] = 'Friday';
weekdays[6] = 'Saturday';

function PageTitle({ setShowModal }) {
  const today = new Date();
  const [day, setDay] = useState(weekdays[today.getDay()]);
  return (
    <div className="title">
      <h1>{day}</h1>
      <button className="add-button" onClick={() => setShowModal(true)}>
        <IoMdAdd size={20} cursor={"pointer"} />
      </button>
    </div>
  );
}

export default PageTitle;
