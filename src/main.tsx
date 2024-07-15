import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditUser from "./pages/editUser.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="edit" element={<EditUser />} />
        </Routes>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);