import { Outlet } from "react-router";
import "./App.css";
import Fundo from "./component/fundo/Fundo";
import Navbar from "./component/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Fundo />
    </>
  );
}

export default App;
