import React from "react";
import "./AppContent.css";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

const TodoItem = ({
  todo,
  toggleChecked,
  editTask,
  deleteTask,
  filterDate,
}) => {
  if (filterDate) {
    if (filterDate.toString() === todo.date) {
      return (
        <div className="todo_wrapper">
          <div className="single_todo">
            <div onClick={() => toggleChecked(todo.id)} className="checkbox">
              {todo.isChecked && (
                <RiCheckboxCircleLine size={20} cursor={"pointer"} />
              )}
              {!todo.isChecked && (
                <RiCheckboxBlankCircleLine size={20} cursor={"pointer"} />
              )}
            </div>
            <div className="new_todos">
              <div className={`new-todo ${todo.isChecked ? "checked" : ""}  `}>
                {todo.name}
                <div onClick={() => editTask(todo)} className="edit_todo">
                  <AiFillEdit size={18} cursor={"pointer"} />
                </div>
              </div>
              <div className="date_todo">
                {new Date(todo.date).toLocaleDateString()}
              </div>
            </div>
            <div className="icons_delete_edit">
              <div onClick={() => deleteTask(todo.id)} className="delete_todo">
                <AiFillDelete size={18} cursor={"pointer"} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="todo_wrapper">
        <div className="single_todo">
          <div onClick={() => toggleChecked(todo.id)} className="checkbox">
            {todo.isChecked && (
              <RiCheckboxCircleLine size={20} cursor={"pointer"} />
            )}
            {!todo.isChecked && (
              <RiCheckboxBlankCircleLine size={20} cursor={"pointer"} />
            )}
          </div>
          <div className="new_todos">
            <div className={`new-todo ${todo.isChecked ? "checked" : ""}  `}>
              {todo.name}
              <div onClick={() => editTask(todo)} className="edit_todo">
                <AiFillEdit size={18} cursor={"pointer"} />
              </div>
            </div>
            <div className="date_todo">
              {new Date(todo.date).toLocaleDateString()}
            </div>
          </div>
          <div className="icons_delete_edit">
            <div onClick={() => deleteTask(todo.id)} className="delete_todo">
              <AiFillDelete size={18} cursor={"pointer"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const AppContent = ({
  todos,
  setShowModal,
  editTask,
  deleteTask,
  toggleChecked,
  filter,
  filterDate,
}) => {
  return (
    <>
      {todos.length === 0 && <h3>No tasks for today...</h3>}
      {todos.map((todo) => {
        if (filter !== "all") {
          if (filter === "finished") {
            return (
              todo.isChecked && (
                <TodoItem
                  filterDate={filterDate}
                  key={todo.id}
                  todo={todo}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  setShowModal={setShowModal}
                  toggleChecked={toggleChecked}
                ></TodoItem>
              )
            );
          } else if (filter === "active") {
            return (
              !todo.isChecked && (
                <TodoItem
                  filterDate={filterDate}
                  key={todo.id}
                  todo={todo}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  setShowModal={setShowModal}
                  toggleChecked={toggleChecked}
                ></TodoItem>
              )
            );
          }
        } else {
          return (
            <TodoItem
              filterDate={filterDate}
              key={todo.id}
              todo={todo}
              editTask={editTask}
              deleteTask={deleteTask}
              setShowModal={setShowModal}
              toggleChecked={toggleChecked}
            ></TodoItem>
          );
        }
      })}
    </>
  );
};
