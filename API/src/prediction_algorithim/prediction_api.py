from google import genai
from google.genai import types
from parser import getEntryObjects,getEntryTickers
from pydantic import BaseModel, Field
from stock_data import getTickerData

client = genai.Client()


# For easy testing
test_path = "/Users/kylelong/Downloads/RH.csv"


class TickerSet(BaseModel):
    tickers: list[str] = Field(description="list of stock tickers. minimum of 8")


def userAnalysis(path):
    entryObjects = getEntryObjects(path)
    entryString = ""
    for entry in entryObjects:
        entryString += f"{entry}, "
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=entryString,
        config=types.GenerateContentConfig(
            system_instruction="You are to recommend new stock tickers based on the submitted users trading patterns",
            response_mime_type="application/json",
            response_json_schema=TickerSet.model_json_schema(),
        ),
    )
    tickerSet = TickerSet.model_validate_json(response.text)
    
    tickerExamanation(tickerSet.tickers, getEntryTickers(path))


def tickerExamanation(suggestedTickers, userTickers):
    userData = getTickerData(userTickers)
    suggestedData = getTickerData(suggestedTickers)
    print(suggestedData)


if __name__ == "__main__":
    userPath = getEntryObjects(test_path)
    callResponse = userAnalysis(test_path)
