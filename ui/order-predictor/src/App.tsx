import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

function App() {
  return (
    <PrimeReactProvider>
      <div className="base-container">
        <div className="welcome-block">
          <h1>Welcome!</h1>
          <h3>To continue, please complete the following steps:</h3>
        </div>
        <div className="stepper-panel">
          <Stepper headerPosition="bottom" orientation="vertical">
            <StepperPanel header=". Get your CSV">
              <div style={{ margin: ".5em" }}>
                <Accordion
                  multiple
                  activeIndex={[0, 1]}
                  className="stepper-accordion"
                >
                  <AccordionTab
                    header="&nbsp;Go to Robinhood"
                    style={{ textAlign: "left", marginBottom: ".25em" }}
                  >
                    <Button
                      icon="pi pi-check"
                      label="Open robinhood.com"
                      onClick={() => window.open("https://robinhood.com/")}
                      className="m-0"
                    ></Button>
                  </AccordionTab>
                  <AccordionTab
                    header="&nbsp;Click on Reports and Statements"
                    style={{ textAlign: "left", marginBottom: ".25em" }}
                  >
                    <Image src="./outlined-menu.png" width="500" preview />
                  </AccordionTab>
                </Accordion>
              </div>
            </StepperPanel>
            <StepperPanel header=". Upload your CSV">
              <Card>
                <FileUpload style={{ margin: "1em" }} />
              </Card>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
