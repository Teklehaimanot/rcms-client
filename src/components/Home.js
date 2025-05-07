import React, { useState } from "react";
import Headers from "./Headers";
import Welcome from "./Welcome";

const Home = () => {
  const [count, setCount] = useState(100);
  const [name, setName] = useState("");

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div className="App">
      <Welcome name="SPHI" age={25} />
      <Welcome name="RDMC" />
      <h1>{count}</h1>
      <h1>{name}</h1>
      <button onClick={increment}>Add</button>
      <button onClick={decrement}>Subtract</button>
      <input
        type="text"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
    </div>
  );
};

export default Home;
