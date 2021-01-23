// const requestURL = 'https://www.nbrb.by/api/exrates/currencies';
const createTemplate = data => {
  if ((data.Cur_Name))return `
    <div class="currency">
      <h1 class="currency__name">Валюта: ${data.Cur_Name}</h1>
      <p class="currency__value">Курс: <span class="value">${data.Cur_OfficialRate}</span></p>
    </div>
  `
  else return `
    <div class="currency">
      <h1 class="currency__name">Валюта: Bitcoin</h1>
      <p class="currency__value">Курс: <span class="value">${(data.USD).symbol} ${(data.USD).last} </span></p>
    </div>
  `
}

const requestURLs = [
  'https://www.nbrb.by/api/exrates/rates/292',      // Евро
  'https://www.nbrb.by/api/exrates/rates/145',      // Доллар США
  // 'https://www.nbrb.by/api/exrates/rates/298',      // Российский рубль
  'https://www.nbrb.by/api/exrates/rates/310',      // Тайский бат
  // 'https://www.nbrb.by/api/exrates/rates/302',      // Турецкая лира
  // 'https://www.nbrb.by/api/exrates/rates/130',      // Швейцарский франк
  // 'https://www.nbrb.by/api/exrates/rates/143',      // Фунт стерлингов
  'https://blockchain.info/ticker',                 // Bitcoin
];

requestURLs.forEach(url => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.body.innerHTML += createTemplate(data);
    });
});
// var sendRequest = 