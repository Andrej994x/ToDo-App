import React, { useState } from "react";
import "./Header.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClear } from "react-icons/md";

const Dropdown = ({ options, change, value }) => {
  const [selectedOption, setSelectedOption] = useState(
    value || options[0].value
  );
  return (
    <select
      value={selectedOption}
      onChange={(e) => {
        setSelectedOption(e.target.value);
        change(e.target.value);
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

export const Header = ({
  todos,
  setTodos,
  filter,
  setFilter,
  filterDate,
  setFilterDate,
}) => {
  const [sorter, setSorter] = useState("");
  const [date, setDate] = useState("");

  const options = [
    { value: "date", label: "Date" },
    { value: "name", label: "To Do" },
    { value: "isChecked", label: "Status" },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "finished", label: "Finished" },
    { value: "active", label: "Active" },
  ];

  const handleSort = (e) => {
    setSorter(e);
    if (e === "isChecked") {
      sortByStatus(e);
    } else if (e === "date") {
      sortByDate(e);
    } else {
      sortByName(e);
    }
  };

  const sortByName = (e) => {
    todos.sort((a, b) => a[e].localeCompare(b[e]));
    setTodos([...todos]);
  };

  const sortByDate = (e) => {
    todos.sort(function (a, b) {
      const keyA = a[e],
        keyB = b[e];
      console.log(keyA, keyB);
      return new Date(keyA) - new Date(keyB);
    });
    setTodos([...todos]);
  };

  const sortByStatus = (e) => {
    todos.sort(function (a, b) {
      const keyA = a[e],
        keyB = b[e];
      return keyA - keyB;
    });
    setTodos([...todos]);
  };

  const handleFilter = (e) => {
    setFilter(e);
  };

  return (
    <div className="header">
      <div className="filters">
        <span>
          Sort:
          <Dropdown value={sorter} options={options} change={handleSort} />
        </span>
        <span>
          Status:
          <Dropdown
            value={filter}
            options={filterOptions}
            change={handleFilter}
          />
        </span>
        <div className="date-filter">
          <span>Date:</span>
          <DatePicker
            selected={filterDate}
            onChange={(d) => {
              setFilterDate(d);
            }}
          />
        </div>
      </div>
    </div>
  );
};
