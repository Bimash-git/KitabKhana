# PKL TO JSON

> This package converts .pkl files to .json files using a python script

### Requirements
1. python3

### Usage

```js

const pklToJson = require('pkl-to-json')
const path = require('path')

const pklPath = path.resolve('./data.pkl')
const jsonPath = path.resolve('./data.json')

// From pkl to json
pklToJson.convert(pklPath, jsonPath);

// From json to pkl
pklToJson.reconvert(jsonPath, pklPath);
```