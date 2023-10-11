import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <div className="centered">
        <Board nrows={5} ncols={5} chanceLightStartsOn={0.25} />
      </div>
    </div>
  );
}

export default App;
