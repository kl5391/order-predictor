import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useState } from "react";

export default function InfoCard({ ticker }) {
  const [tickerInfo, setTickerInfo] = useState({});

  useEffect(() => {
    async function setData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/info/${ticker}`, {
          method: "GET",
          headers: { "Content-Type": "text/plain" },
        });

        if (response.ok) {
          const result = await response.json();
          const stockData = result["data"];
          setTickerInfo(stockData);
        } else {
          console.error("Could not process user data", response.statusText);
        }
      } catch (error) {
        console.error("Error during ticker analysis:", error);
      }
    }
    setData();
  }, [ticker]);

  return (
    <div>
      <h1>{tickerInfo["displayName"]}</h1>
    </div>
  );
}
