import { useEffect } from "react";
import "./App.css";
import ChildDois from "./ChildDois";
import ChildUm from "./ChildUm";
import Counter from "./Counter";
import CounterPersist from "./CounterPersist";

function App() {
  console.log("App renderizou");
  useEffect(() => {
    console.log("App montou");
  }, []);
  return (
    <div>
      <CounterPersist />
      <Counter />
      <ChildUm />
      <ChildDois />
    </div>
  );
}

export default App;
