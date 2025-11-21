import yfinance as yf


def getTickerData(tickers):
    ticker_array = []
    for ticker in tickers:
        data = yf.Ticker(ticker)
        data.history(period="1mo")
        ticker_array.append(data.info)
    return ticker_array
