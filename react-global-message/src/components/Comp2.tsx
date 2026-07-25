import { useEffect } from "react";
import { useMessage } from "../provider/MessageContext";

function Comp2Dois() {
  const { showMessage } = useMessage();

  useEffect(function init() {
    console.log("Comp2Dois mounted");
  }, []);

  console.log("Comp2Dois rendered");

  return (
    <div style={{ border: "1px solid", padding: "1rem" }}>
      <p>Comp2Dois</p>
      <button
        type="button"
        onClick={() => showMessage("Veio do Comp2Dois", "info")}
      >
        Show Message
      </button>
    </div>
  );
}

export default Comp2Dois;
