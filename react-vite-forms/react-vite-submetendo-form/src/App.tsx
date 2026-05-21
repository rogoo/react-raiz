import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <main style={{ padding: "1.5rem" }}>
        <Outlet />
      </main>
      <footer
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          padding: ".5rem",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        footer
      </footer>
    </div>
  );
}

export default App;
