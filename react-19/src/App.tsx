import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./comp/Navbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
