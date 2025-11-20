import csv;

class EntryObject:
    def __init__(self, Ticker, Type, Quantity, Price, Amount):
          self.Ticker = Ticker
          self.Type = Type
          self.Quantity = Quantity
          self.Price = Price
          self.Amount = Amount
    

def getEntryObjects(path = None):
    parsedTrades = []
    if path == None:
            path = input('Input file path to parse\nPath: ')
    try:
        with open(path, newline='') as csvfile:
            reader = csv.reader(csvfile)
            header = next(reader)
            indexes = {"ticker": header.index('Instrument'), "type": header.index('Trans_Code'), 
                            "quantity": header.index('Quantity'), "price": header.index('Price'), "amount": header.index('Amount')}
            for entry in reader:
                  parsedTrades.append(EntryObject(entry[indexes['ticker']], entry[indexes['type']], entry[indexes['amount']], entry[indexes['price']], entry[indexes['amount']]))
            return parsedTrades
    except FileNotFoundError:
          print('A file with this path could not be found')

if __name__ == '__main__':
      getEntryObjects()