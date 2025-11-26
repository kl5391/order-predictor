from flask import Flask
from flask_restful import Resource, Api, reqparse
from stock_data import getTickerData
from upload import Upload

app = Flask(__name__)
api = Api(app)


class TickerData(Resource):
    def get(self, ticker):
        return {"data": getTickerData(ticker)}


api.add_resource(TickerData, "/info/<ticker>")
api.add_resource(Upload, "/upload")

if __name__ == "__main__":
    app.run(debug=True)
