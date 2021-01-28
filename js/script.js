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
const inputPattern = /[^0-9]/g;



const popupRemove = () => popup.classList.remove('active');


const currencyTypes = ['USD', 'EUR', 'BYN'];



const setSavings = {
  // savings: [
  //   {
  //     type: 'USD',
  //     amount: 50
  //   },
  //   {
  //     type: 'EUR',
  //     amount: 70
  //   },
  //   {
  //     type: 'BYN',
  //     amount: 195
  //   }
  // ]
  savings: [],
  setSave(currency, amount) {
    
  },
  getSaves() {

  }
  // получить (и показать?) сбережения
  // записать сбережения

}

localStorage.clear();














// !  Функция инициализации (все события и прочее)
const init = () => {
  showFormButton.addEventListener('click', () => {      //*   вызывает окно с формой
    popup.classList.add('active');
  });

  savingAmountInputElem.addEventListener('input', function () {
    this.value = this.value.replace(inputPattern, '');
  });

  form.addEventListener('submit', e => {      //*   обработка отправки формы
    e.preventDefault();
    const message = 'Заполните все поля';
    const savingCurrencyAmount = form.elements.savingCurrencyAmount.value;
    const savingCurrencyType = form.elements.savingCurrencyType.value;
    if (savingCurrencyType !== '' && savingCurrencyAmount !== '') {
      console.log(savingCurrencyAmount, savingCurrencyType);
      popupRemove();
      form.reset();
    } else alert(message);
  })

  document.addEventListener('keydown', e => {     //*   обработка нажатия клавиш чтобы закрыть форму по Escape
    if (e.code === 'Escape') popupRemove();
  });

  popup.addEventListener('click', e => {      //*   закрытие формы по нажатию мимо формы
    if (!(e.target.closest('.popup__window'))) popupRemove();
  });
}
// !  конец

document.addEventListener('DOMContentLoaded', init); //! вызов инициализирующей функции