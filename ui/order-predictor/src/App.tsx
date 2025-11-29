import { Children, Component, useState } from "react";
import "./App.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <PrimeReactProvider>
      <h1 style={{ margin: 0 }}>Welcome</h1>
      <h5 style={{ fontWeight: "lighter" }}>
        To continue, please complete the following form
      </h5>
      <Stepper headerPosition="bottom" orientation="vertical">
        <StepperPanel header=" Upload a file">
          <Card>
            <FileUpload />
          </Card>
        </StepperPanel>
        <StepperPanel>
          <h1>hey again</h1>
        </StepperPanel>
      </Stepper>
    </PrimeReactProvider>
  );
}

export default App;
