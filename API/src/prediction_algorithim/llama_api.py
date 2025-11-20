from ollama import Client
from parser import getEntryObjects, EntryObject
from pydantic import BaseModel


# For easy testing
test_path = "/Users/kylelong/Downloads/RH.csv"

client = Client()


class EntryResponse(BaseModel):
    values: list[str]


def submitUserData(path):
    response = client.chat(
        model="gpt-oss",
        messages=[{"role": "user", "content": getEntryObjects(path)}],
        format=EntryResponse.model_json_schema(),
    )
    tickers = EntryResponse.model_validate_json(response.message.content)
    return tickers


if __name__ == "__main__":
    result = submitUserData(test_path)
    for row in result:
        print(result)
