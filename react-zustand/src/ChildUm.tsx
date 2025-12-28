import { useCounterStore } from "./state/store";

export default function ChildUm() {
  const { count } = useCounterStore();
  console.log("ChildUm renderizou");
  return (
    <div style={{ border: "1px solid", padding: "1em" }}>
      <h1>Child Um Component</h1>
      <h3>Child Um</h3>
      <p>O valor para count é {count}</p>
    </div>
  );
}
