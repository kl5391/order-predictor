import csv;

class EntryObject:
      def __init__(self, Ticker, Type, Quantity, Price, Amount):
          self.Ticker = Ticker
          self.Type = Type
          self.Quantity = Quantity
          self.Price = Price
          self.Amount = Amount

      def __str__(self):
           return f"Ticker: {self.Ticker}\nOrder Type: {self.Type}\nOrder Quantity:{self.Quantity}\nOrder Price:{self.Price}Order Amount:{self.Amount}"
           
    

def getEntryObjects(path = None):
    parsedTrades = []
    if path == None:
            path = input('Input file path to parse\nPath: ')
    try:
        with open(path, newline='') as csvfile:
            reader = csv.reader(csvfile)
            header = next(reader)
            indexes = [header.index('Instrument'), header.index('Trans Code'), 
                            header.index('Quantity'), header.index('Price'), header.index('Amount')]
            for entry in reader:
                  try:
                        parsedTrades.append(EntryObject(entry[indexes[0]], entry[indexes[1]], entry[indexes[2]], entry[indexes[3]], entry[indexes[4]]))
                  except IndexError:
                        continue
            return parsedTrades
    except FileNotFoundError:
          print('A file with this path could not be found')

if __name__ == '__main__':
      response = getEntryObjects()
      if (response):
           for entry in response:
                print(str(entry) + "\nNEXT ORDER")