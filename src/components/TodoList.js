import React from "react";

const TodoList = ({ todos, handleDelete }) => {
  return (
    <ul className="allTodos">
      {todos.map((t) => (
        <li className="singleTodo" key={t.id}>
          <span className="todoText" >
            {t.todo}
          </span>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
