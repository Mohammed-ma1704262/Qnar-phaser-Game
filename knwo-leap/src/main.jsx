import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";

import MainScreen from "./screens/MainScreen.jsx";
//from here we will create the main start page and the rest of the pages

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <App /> */}
        <MainScreen></MainScreen>
    </React.StrictMode>
);

