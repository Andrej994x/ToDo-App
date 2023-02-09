import React, { useState, useEffect } from "react";
import "./App.css";
import PageTitle from "./components/PageTitle";
import { Header } from "./components/Header";
import { AppContent } from "./components/AppContent";
import { Form } from "./components/Form";
import { message } from "antd";

const getTodos = () => {
  const data = localStorage.getItem("todos");
  if (data) {
    return JSON.parse(data);
  } else return [];
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState(getTodos());
  const [isEdit, setIsEdit] = useState(null);

  const [filter, setFilter] = React.useState("all");
  const [filterDate, setFilterDate] = React.useState("");

  const deleteTask = (id) => {
    const filteredTodo = todos.filter((t) => t.id !== id);

    setTodos(filteredTodo);
    setTimeout(() => {
      message.error("Successfuly deleted");
    }, 200);
  };

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const editTask = (todo) => {
    setIsEdit(todo);
    setShowModal(true);
  };

  const handleEdit = (edited) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === edited.id) {
        return edited;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleChecked = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <PageTitle setShowModal={setShowModal}></PageTitle>
      <Header
        setShowModal={setShowModal}
        todos={todos}
        setTodos={setTodos}
        filter={filter}
        setFilter={setFilter}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      ></Header>
      <AppContent
        todos={todos}
        setTodos={setTodos}
        showModal={showModal}
        setShowModal={setShowModal}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleChecked={toggleChecked}
        filter={filter}
        filterDate={filterDate}
      ></AppContent>
      <Form
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        todos={todos}
        setTodos={setTodos}
      ></Form>
    </div>
  );
}

export default App;
