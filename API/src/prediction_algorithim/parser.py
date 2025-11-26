import csv


class EntryObject:
    def __init__(self, Ticker, Type, Quantity, Price, Amount):
        self.Ticker = Ticker
        self.Type = Type
        self.Quantity = Quantity
        self.Price = Price
        self.Amount = Amount
        if self.Ticker == "":
            raise TypeError(
                f"Incompatible data. Entry will not impact model {self.Ticker}"
            )

    def __str__(self):
        return f"Ticker: {self.Ticker} Order Type: {self.Type} Order Quantity: {self.Quantity} Order Price: {self.Price} Order Amount: {self.Amount}"


def getEntryObjects(data):
    parsedTrades = []
    reader = csv.reader(data)
    header = next(reader)
    indexes = {
        "ticker": header.index("Instrument"),
        "type": header.index("Trans Code"),
        "quantity": header.index("Quantity"),
        "price": header.index("Price"),
        "amount": header.index("Amount"),
    }
    for entry in reader:
        try:
            parsedTrades.append(
                EntryObject(
                    entry[indexes["ticker"]],
                    entry[indexes["type"]],
                    entry[indexes["quantity"]],
                    entry[indexes["price"]],
                    entry[indexes["amount"]],
                ).Ticker
            )
        except TypeError:
            # has some form of incomtabible type
            continue
        except IndexError:
            # invalid entry, does not contain necessary data
            continue
    return parsedTrades


def getEntryTickers(path=None):
    parsedTrades = []
    if path == None:
        path = input("Input file path to parse\nPath: ")
    try:
        with open(path, newline="") as csvfile:
            reader = csv.reader(csvfile)
            header = next(reader)
            indexes = {"ticker": header.index("Instrument")}
            for entry in reader:
                try:
                    if entry[indexes["ticker"]] != "":
                        parsedTrades.append(entry[indexes["ticker"]])
                except TypeError:
                    # has some form of incomtabible type
                    continue
                except IndexError:
                    # invalid entry, does not contain necessary data
                    continue
            return parsedTrades
    except FileNotFoundError:
        print("A file with this path could not be found")
