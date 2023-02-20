import React from "react";

const TodoForm = ({ handleSubmit, todo, setTodo }) => {
  // console.log(todo);
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit"> Go</button>
    </form>
  );
};

export default TodoForm;
