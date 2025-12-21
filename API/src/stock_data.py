import yfinance as yf

"""
This function gets data about a particular ticker within the last month using the yfinance library.
May be subject to change depending on what data I specifically decide to use when users request more info. 
Currently unused.
"""
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
