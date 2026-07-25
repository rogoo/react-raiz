import { useEffect } from "react";
import { useMessageMui } from "../provider/MessageMuiContext";

function Comp3TresMui() {
  const { showMessage } = useMessageMui();

  useEffect(function init() {
    console.log("Comp3TresMui mounted");
  }, []);

  console.log("Comp3TresMui rendered");

  return (
    <div style={{ border: "1px solid", padding: "1rem" }}>
      <p>Comp3TresMui - utilizando Dialog do MUI</p>
      <button
        type="button"
        onClick={() => showMessage({ message: "Veio do Comp3TresMui" })}
      >
        Show Message Mui
      </button>
    </div>
  );
}

export default Comp3TresMui;
