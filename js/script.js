// const requestURL = 'https://www.nbrb.by/api/exrates/currencies';  //! Полный список валют на оф сайте нцбанка РБ
// !  Адреса запросов по валютам
// const requestURLs = [
//   'https://www.nbrb.by/api/exrates/rates/292',      // Евро
//   'https://www.nbrb.by/api/exrates/rates/145',      // Доллар США
//   'https://www.nbrb.by/api/exrates/rates/298',      // Российский рубль
//   'https://www.nbrb.by/api/exrates/rates/310',      // Тайский бат
//   'https://www.nbrb.by/api/exrates/rates/302',      // Турецкая лира
//   'https://www.nbrb.by/api/exrates/rates/130',      // Швейцарский франк
//   'https://www.nbrb.by/api/exrates/rates/143',      // Фунт стерлингов
//   'https://blockchain.info/ticker',                 // Bitcoin
// ];
// !  Конец

const savingsBlock = document.querySelector('.savings');  //  блок со сбережениями
const currenciesBlock = document.querySelector('.currencies');  //  блок с курсами валют
const showFormButton = document.querySelector('.show-form-button'); //  кнопка, которая показывает форму
const popup = document.querySelector('.popup'); //  весь блок с формой
const form = document.querySelector('.form'); //  форма
const savingAmountInputElem = document.querySelector('.saving-amount-input'); //  поле ввода
const radioInput = document.querySelectorAll('.radio-input');   //  все радио кнопки

showFormButton.addEventListener('click', () => {
  popup.classList.add('active');
});
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    popup.classList.remove('active');
  }
});
popup.addEventListener('click', e => {
  if (!(e.target.closest('.popup__window'))) {
    popup.classList.remove('active');
  }
})