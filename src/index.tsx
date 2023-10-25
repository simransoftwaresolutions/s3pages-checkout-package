// import * as ReactDOM from 'react-dom';
// import App from "./App"

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles/globals.css"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);