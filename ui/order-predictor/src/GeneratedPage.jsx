import { Carousel } from "primereact/carousel";

function GeneratedPage({ analyzedTickers }) {
  const stockTemplate = (stock) => {
    console.log(stock);
    return (
      <div className="analyzed-stock">
        <h1>Stock name: {stock.ticker}</h1>
        <div>
          <b>Why this was chosen for you</b>
          <p>{stock.reason}</p>
        </div>
        <div>
          <b>What the data says</b>
          <p>{stock.data}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="generated-page">
      <Carousel
        value={analyzedTickers}
        numScroll={3}
        itemTemplate={stockTemplate}
      />
    </div>
  );
}
export default GeneratedPage;
