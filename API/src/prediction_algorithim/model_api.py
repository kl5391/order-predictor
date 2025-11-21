from openai import OpenAI
from parser import getEntryObjects
from pydantic import BaseModel

client = OpenAI()


# For easy testing
test_path = "/Users/kylelong/Downloads/RH.csv"


class TickerSet(BaseModel):
    tickers: list[str]


def userAnalysis(path):
    entryObjects = getEntryObjects(path)
    entryString = ""
    for entry in entryObjects:
        entryString += f"{entry}, "
    model_response = client.responses.parse(
        model="gpt-3.5-turbo",
        tools=[{"type": "web_search"}],
        input=[
            {
                "role": "system",
                "content": "these are trades submitted by a user. you need to determine a list of accetable tickers to suggest to the user based on the trades they "
                "have provided you",
            },
            {"role": "user", "content": entryString},
        ],
        text_format=TickerSet,
    )
    return model_response.output_parsed


if __name__ == "__main__":
    print(userAnalysis(test_path))
