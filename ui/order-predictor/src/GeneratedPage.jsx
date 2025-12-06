import { Carousel } from "primereact/carousel";

function GeneratedPage({ analyzedTickers }) {
  const stockTemplate = (stock) => {
    console.log(stock);
    return (
      <div className="analyzed-stock">
        <h1>Stock name: {stock.ticker}</h1>
        <p>{stock.reason}</p>
        <p>{stock.data}</p>
      </div>
    );
  };

  return (
    <>
      <Carousel
        value={analyzedTickers}
        numScroll={3}
        itemTemplate={stockTemplate}
      />
    </>
  );
}
export default GeneratedPage;
