import { useEffect } from "react";
import { useMessage } from "../provider/MessageContext";

function Comp1Um() {
  const { showMessage } = useMessage();

  useEffect(function init() {
    console.log("Comp1Um mounted");
  }, []);

  console.log("Comp1Um rendered");

  return (
    <div style={{ border: "1px solid", padding: "1rem" }}>
      <p>Comp1Um</p>
      <button
        type="button"
        onClick={() => showMessage("Veio do Comp1Um", "info")}
      >
        Show Message
      </button>
    </div>
  );
}

export default Comp1Um;
