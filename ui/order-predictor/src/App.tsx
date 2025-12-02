import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
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
                <Accordion activeIndex={[1]} className="stepper-accordion">
                  <AccordionTab
                    header="&nbsp;Step 1: Go to Robinhood"
                    style={{ textAlign: "left", marginBottom: ".25em" }}
                  >
                    <Button
                      label="Open robinhood.com"
                      onClick={() => window.open("https://robinhood.com/")}
                      className="m-0"
                    ></Button>
                  </AccordionTab>
                  <AccordionTab
                    header="&nbsp;Step 2: Click on Reports and Statements"
                    style={{ textAlign: "left", marginBottom: ".25em" }}
                  >
                    <Image src="./outlined-menu.png" width="500" />
                  </AccordionTab>
                  <AccordionTab
                    header="&nbsp;Step 3: Select desired options. Then press Generate Report"
                    style={{ textAlign: "left", marginBottom: ".25em" }}
                  >
                    <div>
                      <Image src="./highlighted-generate.png" width="500" />
                    </div>
                    <p
                      style={{
                        width: 500,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      After doing this, it may take some time for your report to
                      be generated. You will recieve notification via email and
                      push notification on phone once your report is ready for
                      you.
                    </p>
                  </AccordionTab>
                  <AccordionTab
                    header="&nbsp;Step 4: Once ready, click on the Download CSV button"
                    style={{ textAlign: "left", marginBottom: ".25em" }}
                  >
                    <Image src="./download-highlighted.png" width="500" />
                    <p
                      style={{
                        width: 500,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      After doing this, you can proceed to the next step in this
                      process: Uploading your newly generated CSV File.
                    </p>
                  </AccordionTab>
                </Accordion>
              </div>
            </StepperPanel>
            <StepperPanel header=". Upload your CSV">
              <div className="file-upload-div">
                <FileUpload style={{ margin: "1em" }} />
              </div>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
