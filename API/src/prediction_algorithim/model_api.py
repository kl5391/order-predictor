from google import genai
from google.genai import types
from parser import getEntryObjects
from pydantic import BaseModel, Field

client = genai.Client()


# For easy testing
test_path = "/Users/kylelong/Downloads/RH.csv"


class TickerSet(BaseModel):
    tickers: list[str] = Field(description="List of similar stock tickers based on submitted data")


def userAnalysis(path):
    entryObjects = getEntryObjects(path)
    entryString = ""
    for entry in entryObjects:
        entryString += f"{entry}, "
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=entryString,
        config=types.GenerateContentConfig(
        system_instruction="You are to recommend stock tickers based specifically on the submitted users trading patterns", response_mime_type="application/json", 
        response_json_schema=TickerSet.model_json_schema()),
    )
    tickerSet = TickerSet.model_validate_json(response.text)
    return tickerSet


if __name__ == "__main__":
    callResponse = userAnalysis(test_path)
    for result in callResponse:
        print(result)
