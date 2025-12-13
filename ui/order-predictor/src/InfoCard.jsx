import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { Skeleton } from "primereact/skeleton";
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
    <div className="info-card">
      {(Object.keys(tickerInfo).length > 0 && (
        <div>
          <h1>{tickerInfo["displayName"]}</h1>
          <h2>{tickerInfo["industry"]}</h2>
          <a href={tickerInfo["website"]}>{tickerInfo["website"]}</a>
          <h3>
            {tickerInfo["bid"] && tickerInfo["ask"] && (
              <div>
                Bid:{tickerInfo["bid"].toFixed(2)}/Ask:
                {tickerInfo["ask"].toFixed(2)}
              </div>
            )}
          </h3>
        </div>
      )) || <ProgressSpinner />}
    </div>
  );
}
