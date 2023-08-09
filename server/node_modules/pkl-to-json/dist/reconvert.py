import sys
import numpy
import json
import pickle

def main(argv):
    with open(argv[0], 'r') as f:
        data = json.load(f)

    with open(argv[1], 'wb') as f:
        pickle.dump(data, f)

if __name__ == '__main__':
    main(sys.argv[1:])
