from ollama import Client
from parser import getEntryObjects, EntryObject
from pydantic import BaseModel

client = Client()


class EntryResponse(BaseModel):
    values: list[EntryObject]


def submitUserData(path):
    response = client.chat(
        model="gpt-oss",
        messages=[{"role": "user", "content": getEntryObjects(path)}],
        format=EntryResponse.model_json_schema(),
    )
    tickers = EntryResponse.model_validate_json(response.message.content)
    print(tickers)
