import csv

# For easy testing
test_path = "/Users/kylelong/Downloads/RH.csv"


class EntryObject:
    def __init__(self, Ticker, Type, Quantity, Price, Amount):
        if Type == "ACH":
            raise TypeError("Unspported type will not impact model decisions")
        self.Ticker = Ticker
        self.Type = Type
        self.Quantity = Quantity
        self.Price = Price
        self.Amount = Amount

    def __str__(self):
        return f"Ticker: {self.Ticker} Order Type: {self.Type} Order Quantity: {self.Quantity} Order Price: {self.Price}Order Amount: {self.Amount}"


def getEntryObjects(path=None):
    parsedTrades = []
    if path == None:
        path = input("Input file path to parse\nPath: ")
    try:
        with open(path, newline="") as csvfile:
            reader = csv.reader(csvfile)
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
                            entry[indexes['ticker']],
                            entry[indexes['type']],
                            entry[indexes['quantity']],
                            entry[indexes['price']],
                            entry[indexes['amount']],
                        )
                    )
                except TypeError:
                    continue
                except IndexError:
                    continue
            return parsedTrades
    except FileNotFoundError:
        print("A file with this path could not be found")


if __name__ == "__main__":
    response = getEntryObjects(test_path)
    if response:
        for entry in response:
            print(str(entry))
