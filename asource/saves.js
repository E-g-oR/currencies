var database = {
  "user1": {
    "saves": {
      name: "saves",
      USD: 50,
      EUR: 100,
      BYN: 135
    },
    "rates": {
      name: "rates",
      USD: 2.5687,
      EUR: 3.1800,
      RUB: 3.5130
    },
    "converted": {
      name: "converted",
      USD: 223.32,
      EUR: 183.78,
      BYN: 581.9,
      RUB: 16612.42
    },
    "operations": [
      {
        "date": "2021-02-27",
        "currency": "EUR",
        "amount": 20,
        "rate": 3.18
      },
      {
        "date": "2021-01-25",
        "currency": "EUR",
        "amount": 30,
        "rate": 3.19
      },
      {
        "date": "2021-11-17",
        "currency": "EUR",
        "amount": 10,
        "rate": 3.14
      },
      {
        "date": "2021-10-29",
        "currency": "EUR",
        "amount": 10,
        "rate": 3.16
      },
      {
        "date": "2021-09-27",
        "currency": "EUR",
        "amount": 30,
        "rate": 3.14
      },
    ]
  }
}
let sum = 0;
// database.operations.forEach(operation => {
//   sum += Number(operation.amount);
// })
console.log(database);
console.log(database.converted);
console.log(database.rates);
console.log(database.saves);
console.log(sum);