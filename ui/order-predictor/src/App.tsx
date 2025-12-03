import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Orbit } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Orbit />
    </>
  );
}

export default App;
