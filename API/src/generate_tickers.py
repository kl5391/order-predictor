from flask_restful import Resource, reqparse
from prediction_api import userAnalysis, tickerExamanation

class GenerateTickers(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("tickers", type=dict, action="append", required=True)
        data = parser.parse_args()
        analyzedStocks = userAnalysis(data["tickers"])
        tickerList = []
        for stock in data["tickers"]:
            tickerList.append(stock["ticker"])
        validatedStocks = tickerExamanation(analyzedStocks, tickerList)
        returnedStocks = []
        for stock in validatedStocks.stocks:
            returnedStocks.append(stock.model_dump())
        return {"generatedTickers": returnedStocks}