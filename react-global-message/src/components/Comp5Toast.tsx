import { useEffect } from "react";
import { toast } from "sonner";
import { useMessageMui } from "../provider/MessageMuiContext";

function Comp5Toast() {
  const { showMessage } = useMessageMui();

  useEffect(function init() {
    console.log("Comp5Toast mounted");
  }, []);

  console.log("Comp5Toast rendered");

  const handleToastMessage = () => {
    toast.success("Veio do Comp5Toast");
  };

  return (
    <div style={{ border: "1px solid", padding: "1rem" }}>
      <p>Comp5Toast</p>
      <button
        type="button"
        onClick={handleToastMessage}
      >
        Show Message Toas Success
      </button>
    </div>
  );
}

export default Comp5Toast;
