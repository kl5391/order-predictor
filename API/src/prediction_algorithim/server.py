from flask import Flask
from flask_restful import Resource, Api, reqparse
from stock_data import getTickerData
from upload import Upload
from prediction_api import userAnalysis, tickerExamanation, InitialTickerSet
from json import dumps

app = Flask(__name__)
api = Api(app)


class TickerData(Resource):
    def get(self, ticker):
        return {"data": getTickerData(ticker)}
    
class GenerateTickers(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("tickers", type=dict, action='append', required=True)
        data = parser.parse_args()
        analyzedStocks = userAnalysis(data["tickers"])
        tickerList = []
        for stock in data["tickers"]:
            tickerList.append(stock['ticker'])
        validatedStocks = tickerExamanation(analyzedStocks, tickerList)
        return {"generatedTickers": dumps("hey")}


api.add_resource(TickerData, "/info/<ticker>")
api.add_resource(Upload, "/upload")
api.add_resource(GenerateTickers, "/analyze")

if __name__ == "__main__":
    app.run(debug=True)
