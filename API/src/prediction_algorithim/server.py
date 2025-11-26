from flask import Flask
from flask_restful import Resource, Api, reqparse
from prediction_api import userAnalysis, tickerExamanation
from parser import getEntryObjects
from stock_data import getTickerData

app = Flask(__name__)
api = Api(app)


class TickerData(Resource):
    def get(self, ticker):
        return {"data": getTickerData(ticker)}


api.add_resource(TickerData, "/info/<ticker>")

if __name__ == "__main__":
    app.run(debug=True)
