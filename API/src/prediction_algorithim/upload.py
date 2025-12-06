from werkzeug.datastructures import FileStorage
from io import TextIOWrapper
from flask_restful import Resource, reqparse
from parser import getEntryObjects

"""
Class to handle the upload of a CSV file from a client
"""
class Upload(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("file", location="files", type=FileStorage)
        args = parser.parse_args()
        csv_file: FileStorage = args["file"]
        if csv_file.filename.endswith(".csv"):
            """This converts the .csv file into UTF-8 encoding which can then be processed by the getEntryObjects method
            inside of the parser file"""
            csv_stream = TextIOWrapper(csv_file.stream, encoding="utf-8") 
            data = getEntryObjects(csv_stream)
            return {"data": data}
