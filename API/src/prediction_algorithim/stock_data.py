import yfinance as yf


def getTickerData(tickers):
    if isinstance(tickers, list):
        ticker_array = []
        for ticker in tickers:
            data = yf.Ticker(ticker)
            data.history(period="1mo")
            ticker_array.append(data.info)
        return ticker_array
    elif isinstance(tickers, str):
        data = yf.Ticker(tickers)
        data.history(period="1mo")
        return data.info
