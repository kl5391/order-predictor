from flask import Flask
from flask_restful import Resource, Api, reqparse
from stock_data import getTickerData
from upload import Upload
from generate_tickers import GenerateTickers
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)


class TickerData(Resource):
    def get(self, ticker):
        return {"data": getTickerData(ticker)}


api.add_resource(TickerData, "/info/<ticker>")
api.add_resource(Upload, "/upload")
api.add_resource(GenerateTickers, "/analyze")

if __name__ == "__main__":
    app.run(debug=True)
