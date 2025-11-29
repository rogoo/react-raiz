import { Route, Routes } from "react-router";
import "./App.css";
import Fundo from "./component/fundo/Fundo";
import LinkUm from "./component/link-1/LinkUm";
import LinkDois from "./component/link-2/LinkDois";
import MainContent from "./component/main-content/MainContent";
import Navbar from "./component/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/link-1/:nome" element={<LinkUm />} />
          <Route path="/link-2" element={<LinkDois />} />
        </Routes>
      </main>
      <Fundo />
    </>
  );
}

export default App;
