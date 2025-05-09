const categories =["Milk & Dairy","Drinks","Fish & Meat","Fruits & Vegetable","Cooking Essentials","Biscuits & Cakes","Household Tools","Pet Care","Beauty & Healths"]

const products = [{
    "id": 1,
    "PRODUCT NAME": "ridiculus",
    "CATEGORY": "Biscuits & Cakes",
    "price": "$63.10",
    "Sale Price": "$337.08",
    "STOCK": 20,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 2,
    "PRODUCT NAME": "cras",
    "CATEGORY": "Fish & Meat",
    "price": "$74.54",
    "Sale Price": "$386.51",
    "STOCK": 54,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 3,
    "PRODUCT NAME": "a",
    "CATEGORY": "Drinks",
    "price": "$60.00",
    "Sale Price": "$416.27",
    "STOCK": 7,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 4,
    "PRODUCT NAME": "magnis",
    "CATEGORY": "Biscuits & Cakes",
    "price": "$952.57",
    "Sale Price": "$449.39",
    "STOCK": 30,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 5,
    "PRODUCT NAME": "dui nec",
    "CATEGORY": "Pet Care",
    "price": "$747.96",
    "Sale Price": "$308.00",
    "STOCK": 72,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 6,
    "PRODUCT NAME": "nulla",
    "CATEGORY": "Milk & Dairy",
    "price": "$358.29",
    "Sale Price": "$443.81",
    "STOCK": 13,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 7,
    "PRODUCT NAME": "at",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$426.62",
    "Sale Price": "$979.04",
    "STOCK": 99,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 8,
    "PRODUCT NAME": "lectus aliquam",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$110.34",
    "Sale Price": "$109.49",
    "STOCK": 20,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 9,
    "PRODUCT NAME": "et ultrices",
    "CATEGORY": "Fish & Meat",
    "price": "$139.94",
    "Sale Price": "$303.00",
    "STOCK": 68,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 10,
    "PRODUCT NAME": "ipsum integer",
    "CATEGORY": "Biscuits & Cakes",
    "price": "$930.56",
    "Sale Price": "$789.79",
    "STOCK": 74,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 11,
    "PRODUCT NAME": "suspendisse potenti",
    "CATEGORY": "Drinks",
    "price": "$568.64",
    "Sale Price": "$359.17",
    "STOCK": 1,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 12,
    "PRODUCT NAME": "viverra eget",
    "CATEGORY": "Cooking Essentials",
    "price": "$88.70",
    "Sale Price": "$147.11",
    "STOCK": 82,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 13,
    "PRODUCT NAME": "tincidunt",
    "CATEGORY": "Household Tools",
    "price": "$532.22",
    "Sale Price": "$847.61",
    "STOCK": 63,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 14,
    "PRODUCT NAME": "vestibulum velit",
    "CATEGORY": "Beauty & Healths",
    "price": "$977.57",
    "Sale Price": "$382.08",
    "STOCK": 46,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 15,
    "PRODUCT NAME": "nulla tempus",
    "CATEGORY": "Milk & Dairy",
    "price": "$763.60",
    "Sale Price": "$742.44",
    "STOCK": 80,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 16,
    "PRODUCT NAME": "in ante",
    "CATEGORY": "Beauty & Healths",
    "price": "$660.69",
    "Sale Price": "$452.67",
    "STOCK": 84,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 17,
    "PRODUCT NAME": "quis odio",
    "CATEGORY": "Beauty & Healths",
    "price": "$821.21",
    "Sale Price": "$937.61",
    "STOCK": 62,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 18,
    "PRODUCT NAME": "sociis natoque",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$351.29",
    "Sale Price": "$932.01",
    "STOCK": 39,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 19,
    "PRODUCT NAME": "magna at",
    "CATEGORY": "Milk & Dairy",
    "price": "$182.81",
    "Sale Price": "$648.60",
    "STOCK": 29,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 20,
    "PRODUCT NAME": "maecenas rhoncus",
    "CATEGORY": "Drinks",
    "price": "$639.63",
    "Sale Price": "$839.06",
    "STOCK": 55,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 21,
    "PRODUCT NAME": "pede",
    "CATEGORY": "Household Tools",
    "price": "$97.50",
    "Sale Price": "$765.47",
    "STOCK": 90,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 22,
    "PRODUCT NAME": "curae donec",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$763.41",
    "Sale Price": "$202.86",
    "STOCK": 25,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 23,
    "PRODUCT NAME": "rhoncus",
    "CATEGORY": "Fish & Meat",
    "price": "$252.31",
    "Sale Price": "$696.30",
    "STOCK": 51,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 24,
    "PRODUCT NAME": "sit amet",
    "CATEGORY": "Pet Care",
    "price": "$237.58",
    "Sale Price": "$141.27",
    "STOCK": 79,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 25,
    "PRODUCT NAME": "varius nulla",
    "CATEGORY": "Cooking Essentials",
    "price": "$636.59",
    "Sale Price": "$720.85",
    "STOCK": 16,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 26,
    "PRODUCT NAME": "lectus pellentesque",
    "CATEGORY": "Milk & Dairy",
    "price": "$724.09",
    "Sale Price": "$150.82",
    "STOCK": 64,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 27,
    "PRODUCT NAME": "felis",
    "CATEGORY": "Beauty & Healths",
    "price": "$408.45",
    "Sale Price": "$775.03",
    "STOCK": 72,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 28,
    "PRODUCT NAME": "vulputate",
    "CATEGORY": "Fish & Meat",
    "price": "$938.91",
    "Sale Price": "$154.05",
    "STOCK": 35,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 29,
    "PRODUCT NAME": "duis",
    "CATEGORY": "Fish & Meat",
    "price": "$398.98",
    "Sale Price": "$146.92",
    "STOCK": 74,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 30,
    "PRODUCT NAME": "libero non",
    "CATEGORY": "Drinks",
    "price": "$398.80",
    "Sale Price": "$737.65",
    "STOCK": 57,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 31,
    "PRODUCT NAME": "cubilia curae",
    "CATEGORY": "Drinks",
    "price": "$191.49",
    "Sale Price": "$88.18",
    "STOCK": 15,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 32,
    "PRODUCT NAME": "mi integer",
    "CATEGORY": "Drinks",
    "price": "$499.44",
    "Sale Price": "$843.84",
    "STOCK": 86,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 33,
    "PRODUCT NAME": "non ligula",
    "CATEGORY": "Pet Care",
    "price": "$559.98",
    "Sale Price": "$405.01",
    "STOCK": 52,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 34,
    "PRODUCT NAME": "in",
    "CATEGORY": "Household Tools",
    "price": "$264.66",
    "Sale Price": "$807.27",
    "STOCK": 29,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 35,
    "PRODUCT NAME": "pellentesque at",
    "CATEGORY": "Household Tools",
    "price": "$445.64",
    "Sale Price": "$958.87",
    "STOCK": 45,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 36,
    "PRODUCT NAME": "turpis",
    "CATEGORY": "Household Tools",
    "price": "$223.12",
    "Sale Price": "$314.33",
    "STOCK": 40,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 37,
    "PRODUCT NAME": "platea",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$285.59",
    "Sale Price": "$88.59",
    "STOCK": 37,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 38,
    "PRODUCT NAME": "vel dapibus",
    "CATEGORY": "Fish & Meat",
    "price": "$623.17",
    "Sale Price": "$904.31",
    "STOCK": 36,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 39,
    "PRODUCT NAME": "luctus et",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$352.12",
    "Sale Price": "$351.05",
    "STOCK": 28,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 40,
    "PRODUCT NAME": "sed",
    "CATEGORY": "Pet Care",
    "price": "$261.30",
    "Sale Price": "$452.53",
    "STOCK": 29,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 41,
    "PRODUCT NAME": "sem",
    "CATEGORY": "Biscuits & Cakes",
    "price": "$87.72",
    "Sale Price": "$857.66",
    "STOCK": 64,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 42,
    "PRODUCT NAME": "urna ut",
    "CATEGORY": "Beauty & Healths",
    "price": "$167.48",
    "Sale Price": "$368.94",
    "STOCK": 51,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 43,
    "PRODUCT NAME": "nulla",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$486.57",
    "Sale Price": "$417.42",
    "STOCK": 64,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Delete"
  }, {
    "id": 44,
    "PRODUCT NAME": "integer aliquet",
    "CATEGORY": "Fruits & Vegetable",
    "price": "$762.29",
    "Sale Price": "$322.99",
    "STOCK": 94,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 45,
    "PRODUCT NAME": "amet consectetuer",
    "CATEGORY": "Biscuits & Cakes",
    "price": "$968.25",
    "Sale Price": "$296.04",
    "STOCK": 12,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 46,
    "PRODUCT NAME": "massa quis",
    "CATEGORY": "Beauty & Healths",
    "price": "$560.78",
    "Sale Price": "$476.06",
    "STOCK": 25,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 47,
    "PRODUCT NAME": "dolor",
    "CATEGORY": "Drinks",
    "price": "$253.58",
    "Sale Price": "$758.86",
    "STOCK": 17,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Edit"
  }, {
    "id": 48,
    "PRODUCT NAME": "ligula pellentesque",
    "CATEGORY": "Cooking Essentials",
    "price": "$385.67",
    "Sale Price": "$739.44",
    "STOCK": 23,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }, {
    "id": 49,
    "PRODUCT NAME": "eget vulputate",
    "CATEGORY": "Cooking Essentials",
    "price": "$864.50",
    "Sale Price": "$214.88",
    "STOCK": 36,
    "STATUS": "selling",
    "View": "view",
    "PUBLISHED": false,
    "ACTIONS": "Edit"
  }, {
    "id": 50,
    "PRODUCT NAME": "dictumst aliquam",
    "CATEGORY": "Cooking Essentials",
    "price": "$284.32",
    "Sale Price": "$138.49",
    "STOCK": 72,
    "STATUS": "sold out",
    "View": "view",
    "PUBLISHED": true,
    "ACTIONS": "Delete"
  }]
  

export {    
    categories,
    products
}