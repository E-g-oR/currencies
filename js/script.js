// const requestURL = 'https://www.nbrb.by/api/exrates/currencies';

const saves = document.querySelector('.saves'),
  amountInput = document.querySelector('.amount-input'),
  sendBtn = document.querySelector('#send'),
  header = document.querySelector('.header'),
  pattern = /[^0-9]/g;
// 
amountInput.oninput = function () {
  this.value = this.value.replace(pattern, '');
}




// ? ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ 
const savesTemplate = save => {
  return `
    <div class="save">
      <span class="save__currency">${save.name}</span><span class="save__amount">${save.amount}</span><span class="save__symbol">${save.symbol}</span>
    </div>
  `
}
fetch('https://e-g-or.github.io/currencies/asource/saves.js')
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    data.forEach(element => {
      saves.innerHTML += savesTemplate(element);
    });
  })
// ? ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼



// ! ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ 
const createTemplate = data => {
  if ((data.Cur_Name)) return `
    <div class="currency">
      <h1 class="currency__name">Валюта: ${data.Cur_Name}</h1>
      <p class="currency__value">Курс: <span class="value">${data.Cur_OfficialRate} Br</span></p>
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
      header.innerHTML += createTemplate(data);
    });
});
// ! ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ 



sendBtn.addEventListener('click', (e) => {
  console.log("click");
  let amount = amountInput.value;
  if (amount != '') {
    console.log(amount);
  } else console.log("type something, idiot");
  // if (e.target.closest("#send")) console.log("кнопка"); else console.log("не кнопка");
})