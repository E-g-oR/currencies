// const requestURL = 'https://www.nbrb.by/api/exrates/currencies';  //! Полный список валют на оф сайте нцбанка РБ
// !  Адреса запросов по валютам
const URLRatesList = [
  'https://www.nbrb.by/api/exrates/rates/292',      // Евро
  'https://www.nbrb.by/api/exrates/rates/145',      // Доллар США
  'https://www.nbrb.by/api/exrates/rates/298',      // Российский рубль
  'https://www.nbrb.by/api/exrates/rates/310',      // Тайский бат
  // 'https://www.nbrb.by/api/exrates/rates/302',      // Турецкая лира
  // 'https://www.nbrb.by/api/exrates/rates/130',      // Швейцарский франк
  // 'https://www.nbrb.by/api/exrates/rates/143',      // Фунт стерлингов
  'https://blockchain.info/ticker',                 // Bitcoin
];
// !  Конец

const URLImagesList = ['img/usa.jpg', 'img/europe.jpg', 'img/thai.jpg', 'img/bit.jpg'];

const savingsBlock = document.querySelector('.savings');  //  блок со сбережениями
const currenciesBlock = document.querySelector('.currencies');  //  блок с курсами валют
const showFormButton = document.querySelector('.show-form-button'); //  кнопка, которая показывает форму
const popup = document.querySelector('.popup'); //  весь блок с формой
const form = document.querySelector('.form'); //  форма
const savingAmountInputElem = document.querySelector('.saving-amount-input'); //  поле ввода
const radioInput = document.querySelectorAll('.radio-input');   //  все радио кнопки
const inputPattern = /\D/g;
const footerDate = document.querySelector('.footer__date');
const convertedElem = document.querySelector('.converted');
const clearLS = document.querySelector('.clearLS');
// /^[-0-9]{1}[0-9]{1,8}$/
// var USDRate = 0;
// var EURRate = 0;


const popupRemove = () => {
  popup.classList.remove('active');
  document.body.style.overflowY = 'scroll';
  document.body.style.marginRight = '0';
}

const currencyTypes = ['USD', 'EUR', 'BYN'];

const savingPattern = (data) => {
  return `        
    <div class="savings__item saving">
      <span class="saving__text">
        <span class="saving__currency">${data.type}</span>
        <span class="saving__amount">${data.amount}</span>
      </span>
    </div>`
}



const currenciesPattern = data => {
  if ((data.Cur_Abbreviation === 'USD')) {
    localStorage.setItem('USDRate', data.Cur_OfficialRate);
    // setSavings.getRatesToConvert(data.Cur_Abbreviation, data.Cur_OfficialRate);
  } else if (data.Cur_Abbreviation === 'EUR') {
    localStorage.setItem('EURRate', data.Cur_OfficialRate);
  }

  const ImageURL = data.Cur_Abbreviation === 'USD' ? URLImagesList[0] :
    data.Cur_Abbreviation === 'EUR' ? URLImagesList[1] :
      data.Cur_Abbreviation === 'THB' ? URLImagesList[2] :
        URLImagesList[3];
  if (data.Cur_Name) return `
        <div class="currencies__item currency">
          <div class="currency__body">
            <div class="currency__img">
              <img src="${ImageURL}" alt="">
            </div>
            <div class="currency__content">
              <h4 class="currency__title">Валюта: ${data.Cur_Name} </h4>
              <p class="currrency__text">Текущий курс:<span class="currency__rate"> ${data.Cur_OfficialRate} </span></p>
            </div>
          </div>
        </div>
  `
  else return `
        <div class="currencies__item currency">
          <div class="currency__body">
            <div class="currency__img">
              <img src="${ImageURL}" alt="">
            </div>
            <div class="currency__content">
              <h4 class="currency__title">Валюта: Bitcoin </h4>
              <p class="currrency__text">Текущий курс:<span class="currency__rate"> ${data.USD.last} </span></p>
            </div>
          </div>
        </div>
  `
}

const getRates = (list) => {
  currenciesBlock.innerHTML = '';
  list.forEach(url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        currenciesBlock.innerHTML += currenciesPattern(data);
      })
  })
}

const setSavings = {
  savingsBR: 0,
  savingsUSD: 0,
  savingsEUR: 0,
  savings: [],
  ratesToConver: [],
  currenciesList: ['USD', 'BYN', 'EUR'],
  convertSaves() {
    this.savingsBR = 0;
    this.savings.forEach(elem => {
      const elemAmount = Number(elem.amount);
      let convertedElemAmount = 0;
      // console.log(elem);
      // console.log(elemAmount);
      // console.log(convertedElemAmount);
      if (elem.type === 'USD') {
        this.ratesToConver.forEach(rateElem => {
          if (rateElem.type === 'USDRate') {
            convertedElemAmount = elemAmount * Number(rateElem.rate);
            console.log(convertedElemAmount);
          }
        })
      } else if(elem.type === 'EUR') {
        // console.log(this.ratesToConver);
        this.ratesToConver.forEach(rateElem => {
          if (rateElem.type === 'EURRate') {
            convertedElemAmount = elemAmount * Number(rateElem.rate);
            console.log(convertedElemAmount);
          }
        })
      } else this.savingsBR += elemAmount;
      this.savingsBR += convertedElemAmount;
    })
    this.savingsBR = +this.savingsBR.toFixed(2);
  },
  setSave(currency, amount) {
    const localStorageLength = localStorage.length;
    if (localStorageLength !== 0) {
      let found = false;
      for (let i = 0; i < localStorageLength; i++) {
        let key = localStorage.key(i);
        if (key === currency) {
          let prevAmount = Number(localStorage.getItem(key));
          let newAmount = prevAmount + amount;
          localStorage.setItem(key, newAmount);
          found = true;
          break;
        } else {
        }
      }
      if (found === false) {
        localStorage.setItem(currency, amount);
      }
    } else {
      localStorage.setItem(currency, amount);
    }
    this.getSaves();
  },
  getRatesToConvert() {
    // console.clear();
    this.ratesToConver = [];
    for (let i = 0; i < localStorage.length; i++) {
      if ((localStorage.key(i) === 'USDRate') || (localStorage.key(i) === 'EURRate')) {
        let key = localStorage.key(i);
        let rate = localStorage.getItem(key);
        this.ratesToConver.push({
          type: key,
          rate: rate
        })
      }
    }
    // console.log(this.ratesToConver);
  },
  getSaves() {
    this.savings = [];
    const localStorageLength = localStorage.length;
    if (localStorageLength !== 0) {
      this.currenciesList.forEach(elem => {
        for (let i = 0; i < localStorageLength; i++) {
          let key = localStorage.key(i);
          let amount = localStorage.getItem(key);
          if (key === elem) {
            this.savings.push({
              type: key,
              amount: amount
            });
            break;
          }
        }
      })
    } else { console.log('пусто'); }
    savingsBlock.innerHTML = '';
    this.savings.forEach(elem => {
      savingsBlock.innerHTML += savingPattern(elem);
    })
    console.log(this.savings);
    this.getRatesToConvert();
    this.convertSaves();
    console.log(`Сбережения в рублях: ${this.savingsBR}`);
    convertedElem.textContent = this.savingsBR
  }
}



// !  Функция инициализации (все события и прочее)
const init = () => {
  showFormButton.addEventListener('click', () => {      //*   вызывает окно с формой
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  setSavings.getSaves();
  setSavings.getRatesToConvert();
  getRates(URLRatesList);

  clearLS.addEventListener('click', () => {
    localStorage.clear();
    setSavings.getSaves();
    getRates(URLRatesList);
    setSavings.getRatesToConvert();
  })
  savingAmountInputElem.addEventListener('input', function () {
    this.value = this.value.replace(inputPattern, '');
  });

  form.addEventListener('submit', e => {      //*   обработка отправки формы
    e.preventDefault();
    const message = 'Заполните все поля';
    const savingCurrencyAmount = Number(form.elements.savingCurrencyAmount.value);
    const savingCurrencyType = form.elements.savingCurrencyType.value;
    if (savingCurrencyType !== '' && savingCurrencyAmount !== '') {
      // console.log(`Введено число: ${savingCurrencyAmount}, выбрана валюта: ${savingCurrencyType}`);

      setSavings.setSave(savingCurrencyType, savingCurrencyAmount);

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

  // footerDate.textContent = new Date().toLocaleDateString();
  footerDate.textContent = new Date().toDateString();


}
// !  конец

document.addEventListener('DOMContentLoaded', init); //! вызов инициализирующей функции