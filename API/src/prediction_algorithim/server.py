from flask import Flask
from flask_restful import Resource, Api, reqparse
from prediction_api import userAnalysis, tickerExamanation
from parser import getEntryObjects
from stock_data import getTickerData
from werkzeug.datastructures import FileStorage
from io import TextIOWrapper
from csv import reader

app = Flask(__name__)
api = Api(app)


class TickerData(Resource):
    def get(self, ticker):
        return {"data": getTickerData(ticker)}


class Upload(Resource):
    def get(self):
        return {"data": "youre at the right endpoint"}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("file", location="files", type=FileStorage, required=True)
        args = parser.parse_args()
        csv_file: FileStorage = args["file"]
        if csv_file.filename.endswith(".csv"):
            csv_stream = TextIOWrapper(csv_file.stream, encoding="utf-8")
            data = getEntryObjects(csv_stream)
            return {"data": data}


api.add_resource(TickerData, "/info/<ticker>")
api.add_resource(Upload, "/upload")

if __name__ == "__main__":
    app.run(debug=True)
