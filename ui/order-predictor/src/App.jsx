import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FileUpload } from "primereact/fileupload";
import { useState } from "react";
import Instructions from "./Instructions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function App() {
  const [stepperIndex, setStepperIndex] = useState(0);
  const [uploadedTickers, setUploadedTickers] = useState([]);
  const [generatedTickers, setGeneratedTickers] = useState([]);
  const handleUpload = async (event) => {
    const files = event.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const stockArray = result["data"];
        setUploadedTickers(stockArray);
        setStepperIndex(2);
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <PrimeReactProvider>
      {!(generatedTickers.length > 0) && (
        <div className="base-container">
          <div className="welcome-block">
            <h1>Welcome!</h1>
            <h3>To continue, please complete the following steps:</h3>
          </div>
          <div className="stepper-panel">
            <Stepper
              headerPosition="bottom"
              orientation="vertical"
              activeStep={stepperIndex}
            >
              <StepperPanel header=". Get your CSV">
                <Instructions />
              </StepperPanel>
              <StepperPanel header=". Upload your CSV">
                <div className="file-upload-div">
                  <FileUpload
                    style={{ margin: "1em" }}
                    accept=".csv"
                    url={"http://localhost:5000/upload"}
                    name="file"
                    customUpload
                    uploadHandler={(event) => handleUpload(event)}
                  />
                </div>
              </StepperPanel>

              <StepperPanel header=". Confirm your parsed data">
                <div className="uploaded-ticker-box">
                  <DataTable value={uploadedTickers}>
                    <Column field="ticker" header="Ticker"></Column>
                    <Column field="type" header="Order Type"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="amount" header="Amount"></Column>
                  </DataTable>
                </div>
                {uploadedTickers.length > 0 && (
                  <Button
                    severity="success"
                    label="Confirm Selections"
                    raised
                  />
                )}
              </StepperPanel>
            </Stepper>
          </div>
        </div>
      )}
      {
        <div>
          <h1>hey</h1>
        </div>
      }
    </PrimeReactProvider>
  );
}

export default App;
