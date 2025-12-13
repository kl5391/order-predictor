import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { OverlayPanel } from "primereact/overlaypanel";
import InfoCard from "./InfoCard";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

function GeneratedPage({ analyzedTickers }) {
  const stockTemplate = (stock) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
      <div className="analyzed-stock">
        <h1>{stock.ticker}</h1>
        <div>
          <b>Why this was chosen for you</b>
          <p>{stock.reason}</p>
        </div>
        <div>
          <b>What the data says</b>
          <p>{stock.data}</p>
        </div>
        <Dialog visible={dialogOpen} onHide={() => setDialogOpen(!dialogOpen)}>
          <InfoCard ticker={stock.ticker} />
        </Dialog>
        <Button onClick={() => setDialogOpen(!dialogOpen)}>
          View More Info
        </Button>
      </div>
    );
  };

  return (
    <div className="generated-page">
      <h1>Your Generated Stocks({analyzedTickers.length}):</h1>
      <Carousel
        showIndicators={false}
        value={analyzedTickers}
        numScroll={3}
        numVisible={3}
        circular
        itemTemplate={stockTemplate}
      />
    </div>
  );
}
export default GeneratedPage;
