import React from "react";
import Items from "./components/items.js";

function App() {
  return (
    <div className="App">
      <h1>Proyecto React N1</h1>
      <p>Tener en cuenta que todo lo que escribamos aca es el contenido</p>
      <ul>
        < Items /> 
      </ul>
    </div>
  );
}

export default App;
