import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";

function App() {
  return (
    <div className="container">
      <Navigation />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
