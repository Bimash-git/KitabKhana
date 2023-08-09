import sys
import numpy
import json
import pickle

def main(argv):
    with open(argv[0], 'rb') as f:
        data = pickle.load(f)

    with open(argv[1], 'w') as f:
        json.dump(data, f)

if __name__ == '__main__':
    main(sys.argv[1:])
