import "./App.css";
import { toggleMachine } from "./machines/rootMachine";

function App() {
  console.log("toggleMachine", toggleMachine);
  return (
    <>
      <button>spawn</button>
    </>
  );
}

export default App;
