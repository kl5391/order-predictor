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
import { ProgressSpinner } from "primereact/progressspinner";
import "primeicons/primeicons.css";
import GeneratedPage from "./GeneratedPage";
import { OverlayPanel } from "primereact/overlaypanel";
import InfoCard from "./InfoCard";

function App() {
  const [stepperIndex, setStepperIndex] = useState(0);
  const [uploadedTickers, setUploadedTickers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analyzedTickers, setAnalyzedTickers] = useState([]);

  const confirmClicked = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ tickers: uploadedTickers }),
      });

      if (response.ok) {
        const result = await response.json();
        const stocksArray = result["generatedTickers"];
        setAnalyzedTickers(stocksArray);
      } else {
        console.error("Could not process user data", response.statusText);
      }
    } catch (error) {
      console.error("Error during ticker analysis:", error);
    } finally {
      setIsGenerating(false);
    }
  };

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
      <div className="app">
        {isGenerating == false && analyzedTickers.length <= 0 && (
          <div className="base-container">
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
                      disabled={uploadedTickers.length > 0}
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
                      onClick={confirmClicked}
                    />
                  )}
                </StepperPanel>
              </Stepper>
            </div>
          </div>
        )}
        {analyzedTickers.length <= 0 && isGenerating == true && (
          <div className="loading-page">
            <h1>Analyzing Your Data...</h1>
            <ProgressSpinner />
          </div>
        )}
        {0 < analyzedTickers.length && (
          <GeneratedPage analyzedTickers={analyzedTickers} />
        )}
      </div>
    </PrimeReactProvider>
  );
}

export default App;
