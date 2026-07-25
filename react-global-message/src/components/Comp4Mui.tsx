import { useEffect } from "react";
import { useMessageMui } from "../provider/MessageMuiContext";

function Comp4QuatroMui() {
  const { showMessage } = useMessageMui();

  useEffect(function init() {
    console.log("Comp4QuatroMui mounted");
  }, []);

  console.log("Comp4QuatroMui rendered");

  return (
    <div style={{ border: "1px solid", padding: "1rem" }}>
      <p>Comp4QuatroMui - utilizando Dialog do MUI</p>
      <button
        type="button"
        onClick={() =>
          showMessage({ title: "Aviso", message: "Veio do Comp4QuatroMui" })
        }
      >
        Show Message Mui
      </button>
    </div>
  );
}

export default Comp4QuatroMui;
