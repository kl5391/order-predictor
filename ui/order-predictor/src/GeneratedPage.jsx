import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";

function GeneratedPage({ analyzedTickers }) {
  const stockTemplate = (stock) => {
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
        <Button label="Get More Info" />
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
