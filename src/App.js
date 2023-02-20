import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";
import Header from './components/Header';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [user, setUser] = useState({});
  const [IsSignedIn, setIsSignedIn] = useState(false);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setIsSignedIn(true);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    setIsSignedIn(false);
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "1024960509808-6rqdknpet2odqdf16mu86tvh6folv7d4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      // console.log(e.target.value);
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  return (
    <div className="App">
      {!IsSignedIn && (
        <div>
          <h1 style={{ color: "#11cea5", textAlign: "center" }}>Sign In</h1>
          <br />
          <div id="signInDiv"></div>
        </div>
      )}
      {IsSignedIn && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {/* {user && (
        <div>
          <img src={user.picture} alt="" />
          <h3>{user.name}</h3>
        </div>
      )} */}
      {IsSignedIn && (
        <div className="container">
          <h1>To-do List</h1>
          {/* <Header
              handleSignOut={handleSignOut}
            /> */}
          <TodoForm handleSubmit={handleSubmit} todo={todo} setTodo={setTodo} />

          <TodoList todos={todos} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default App;

// import Login from "./components/Login/Login";
// import Home from './components/Home/Home';

// function App() {
//   return (
//     <div>
//   <Login />
//   <Home />
//   </div>
//   );
// }

// export default App;
