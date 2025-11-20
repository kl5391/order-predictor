import csv;

def getEntryObjects(path = None):
    if path == None:
            path = input('Input file path to parse\nPath: ')
    try:
        with open(path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                    print(row)
    except FileNotFoundError:
          print('A file with this path could not be found')

if __name__ == '__main__':
      getEntryObjects()