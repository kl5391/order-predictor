from werkzeug.datastructures import FileStorage
from io import TextIOWrapper
from flask_restful import Resource, reqparse
from parser import getEntryObjects

class Upload(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("file", location="files", type=FileStorage, required=True)
        args = parser.parse_args()
        csv_file: FileStorage = args["file"]
        if csv_file.filename.endswith(".csv"):
            csv_stream = TextIOWrapper(csv_file.stream, encoding="utf-8")
            data = getEntryObjects(csv_stream)
            return {"data": data}