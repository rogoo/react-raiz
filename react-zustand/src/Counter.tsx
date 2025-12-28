import { useEffect } from "react";
import { useCounterStore } from "./state/store";

export default function Counter() {
  const { count, increment, decrement, incrementAsync } = useCounterStore();
  console.log("Counter renderizou");
  useEffect(() => {
    console.log("Counter montou");
  }, []);
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Directly set the count in the store
      useCounterStore.setState({ count: value });
    }
  };
  return (
    <div style={{ border: "1px solid", padding: "1em" }}>
      <h1>Counter Component</h1>
      <h3>Valor count é {count}</h3>
      <input type="text" value={count} onChange={(e) => handleCountChange(e)} />
      <button className="btt" onClick={increment}>
        Increment Count
      </button>
      <button className="btt" onClick={incrementAsync}>
        Increment Count Async
      </button>
      <button className="btt" onClick={decrement}>
        Decrement Count
      </button>
    </div>
  );
}
