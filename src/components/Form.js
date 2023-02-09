import React, { useState, useEffect } from "react";
import { message } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Form.css";

export const Form = ({
  callback,
  showModal,
  setShowModal,
  isChecked,
  todos,
  setTodos,
  handleAdd,
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Math.floor(Math.random() * 100).toString(),
      date: date,
      name: name,
      isChecked: false,
    };

    if (name && date !== "") {
      setTodos([...todos].concat(newTodo).reverse());
      setName("");
      setDate("");
      isChecked = false;

      setTimeout(() => {
        message.success("successfuly added");
      }, 200);
    } else {
      return null;
    }

    handleAdd(newTodo);

    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div>
          <div className="form-wrapper">
            <div className="form_todo">
              <div className="form_title">
                <h3>Create your task</h3>
              </div>
              <label for="fname">Name</label>
              <input
                type="text"
                id="fname"
                name="Name"
                value={name}
                placeholder="Task name.."
                onChange={(e) => setName(e.target.value)}
              />

              <label for="lname">Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => {
                  setDate(d);
                }}
              />

              <div className="btn-form">
                <div className="add-btn-form">
                  <button onClick={(e) => handleSubmit(e)}>Add Task</button>
                </div>
                <div className="cancel-btn-form">
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
