from google import genai
from google.genai import types
from parser import getEntryObjects, getEntryTickers
from pydantic import BaseModel, Field
from stock_data import getTickerData
from os import environ

client = genai.Client(api_key=environ.get("PREDICTOR_KEY"))


# For easy testing
test_path = "/Users/kylelong/Downloads/RH.csv"
initial_system_instruction = "You are to recommend new stock tickers based on the submitted users trading patterns. Minimum of 5"


class InitialTickerSet(BaseModel):
    tickers: list[str] = Field(description="list of stock tickers. minimum of 8")


class ValidatedStock(BaseModel):
    ticker: str = Field(description="name of ticker")
    reason: str = Field(description="brief reason for why stock is a good fit")
    data: str = Field(
        description="relevant data for selected stock. don't be afraid to use actual numbers"
    )


class ReturnedDataSet(BaseModel):
    stocks: list[ValidatedStock] = Field(
        description="List of validated stock tickers. Must not be users previous stocks. Make sure they match"
    )


def userAnalysis(entryObjects):
    entryString = ""
    for entry in entryObjects:
        entryString += f"{entry}, "
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=entryString,
        config=types.GenerateContentConfig(
            system_instruction=initial_system_instruction,
            response_mime_type="application/json",
            response_json_schema=InitialTickerSet.model_json_schema(),
        ),
    )
    tickerSet = InitialTickerSet.model_validate_json(response.text)
    return tickerSet


def tickerExamanation(suggestedTickers, userTickers):
    userData = str(getTickerData(userTickers))
    suggestedData = str(getTickerData(suggestedTickers))
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            userData,
            "THIS IS THE SPLIT. THIS IS THE BEGINNING OF THE PROPOSED DATA",
            suggestedData,
        ],
        config=types.GenerateContentConfig(
            system_instruction=f"You need to determine if these stocks are comparable based on your initial prompt. Do not be afraid to disinclude tickers that do not match {initial_system_instruction}. Please make sure they are new stocks",
            response_mime_type="application/json",
            response_json_schema=ReturnedDataSet.model_json_schema(),
        ),
    )
    validatedTickerSet = ReturnedDataSet.model_validate_json(response.text)
    return validatedTickerSet


if __name__ == "__main__":
    userPath = getEntryObjects(test_path)
    callResponse = userAnalysis(test_path)
    result = tickerExamanation(callResponse, getEntryTickers(test_path))
