import { Toaster } from "sonner";
import "./App.css";
import Comp1Um from "./components/Comp1";
import Comp2Dois from "./components/Comp2";
import Comp3TresMui from "./components/Comp3Mui";
import Comp4QuatroMui from "./components/Comp4Mui";
import Comp5Toast from "./components/Comp5Toast";
import { MessageProvider } from "./provider/MessageContext";
import { MessageMuiProvider } from "./provider/MessageMuiContext";

function App() {
  return (
    <>
      <Toaster duration={2500} position="top-center" richColors />
      <MessageMuiProvider>
        <MessageProvider>
          <Comp1Um />
          <Comp2Dois />
          <Comp3TresMui />
          <Comp4QuatroMui />
          <Comp5Toast />
        </MessageProvider>
      </MessageMuiProvider>
    </>
  );
}

export default App;
