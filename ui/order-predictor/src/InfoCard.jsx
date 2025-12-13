import { OverlayPanel } from "primereact/overlaypanel";
import { useState } from "react";

export default function InfoCard({ ticker }) {
  const [tickerInfo, setTickerInfo] = useState({});

  const getTickerInfo = async (ticker) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/ticker/${ticker}`, {
        method: "GET",
        headers: { "Content-Type": "Application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        const stockData = result["data"];
        setTickerInfo(stockData);
        console.log(stockData);
      } else {
        console.error("Could not process user data", response.statusText);
      }
    } catch (error) {
      console.error("Error during ticker analysis:", error);
    }
  };

  return <h1>{tickerInfo["displayName"]}</h1>;
}
