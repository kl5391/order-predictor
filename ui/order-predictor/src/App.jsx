import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { FileUpload } from "primereact/fileupload";
import { useState } from "react";
import Instructions from "./Instructions";

function App() {
  const [uploadedTickers, setUploadedTickers] = useState([]);
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
        setUploadedTickers(result);
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

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
          </Stepper>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
