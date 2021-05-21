// const requestURL = 'https://www.nbrb.by/api/exrates/currencies';  //! Полный список валют на оф сайте нцбанка РБ
// !  Адреса запросов по валютам
const URLRatesList = [
  'https://www.nbrb.by/api/exrates/rates/292',      //? Евро
  'https://www.nbrb.by/api/exrates/rates/145',      //? Доллар США
  'https://www.nbrb.by/api/exrates/rates/298',      //? Российский рубль
  'https://www.nbrb.by/api/exrates/rates/310',      //? Тайский бат
  'https://www.nbrb.by/api/exrates/rates/302',      //? Турецкая лира
  'https://www.nbrb.by/api/exrates/rates/130',      //? Швейцарский франк
  'https://www.nbrb.by/api/exrates/rates/143',      //? Фунт стерлингов
  'https://blockchain.info/ticker',                 //? Bitcoin
];
// !  Конец
//?  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//?  €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
const URLImagesList = [
  'img/united-states.svg',
  'img/european-union.svg',
  'img/thailand.svg',
  'img/bitcoin-1.svg',
  'img/russia.svg',
  'img/switzerland.svg',
  'img/turkey.svg',
  'img/united-kingdom.svg'];
const topBarArrow = document.querySelector('.top-bar_arrow');
const topBar = document.querySelector('.top-bar');
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


const popupRemove = () => {
  popup.classList.remove('active');
  document.body.style.overflowY = 'scroll';
  document.body.style.marginRight = '0';
}

const currencyTypes = ['USD', 'EUR', 'BYN'];


var ratesStatistics = []




const savingPattern = (data) => {
  return `        
    <button class="savings__item saving ripple__button">
      <span class="saving__text">
        <span class="saving__currency">${data.type}</span>
        <span class="saving__amount">${data.amount}</span>
      </span>
    </button>`
}

async function getStatisticsRequest(URLStatisticsList) {
  URLStatisticsList.forEach(statisticsURL => {
    fetch(statisticsURL)
      .then(response => response.json())
      .then(data => {
        let objectCurId = data[0].Cur_ID;
        ratesStatistics.forEach(elem => {
          if (elem.Cur_ID === objectCurId) {
            elem.statistics = data;
          }
        });
      });
  });
}



function getStatistics(searchName, currencyElem) {
  var data = [];
  var labels = [];
  if (currencyElem.lastChild.classList) {
    currencyElem.lastChild.remove();
  } else {
    if (searchName === "Батов") return false
    else {
      ratesStatistics.forEach(elem => {
        if (elem.Cur_Name === searchName) {
          const chartHTML = `<div class="chart-wrap"><canvas class="ct-chart chart_div" id="${elem.Cur_Abbreviation}-linear-chart"></canvas></div>`;
          const elemStatistics = elem.statistics;
          elemStatistics.forEach(statisticsElem => {
            const shortDate = statisticsElem.Date.slice(5, 10).replace('-', '.');
            statisticsElem.Date = shortDate;
            labels.push(shortDate); //! chart.js
            data.push(statisticsElem.Cur_OfficialRate); //! chart.js
          })
          currencyElem.innerHTML += chartHTML;
          // ! const chartDraw = new Chartist.Line(`#${elem.Cur_Abbreviation}-linear-chart`, chartData, options);
          var ctx = document.getElementById(`${elem.Cur_Abbreviation}-linear-chart`).getContext("2d");
          let pointColor,
            fontColor,
            addColorStop1 = "rgba(255, 255, 255, 0.3)",
            addColorStop2 = "rgba(255, 255, 255, 0.1)",
            addColorStop3 = "rgba(255, 255, 255, 0.005)",
            addColorStop4 = "rgba(255, 255, 255, 0.00001)";
          if (document.body.style.backgroundColor == "#fff") {
            pointColor = "#000";
            fontColor = "rgba(0,0,0,0.5)";
            addColorStop1 = "rgba(0, 0, 0, 0.3)";
            addColorStop2 = "rgba(0, 0, 0, 0.1)";
            addColorStop3 = "rgba(0, 0, 0, 0.005)";
            addColorStop4 = "rgba(0, 0, 0, 0.00001)";
          } else {
            fontColor = "rgba(255,255,255,0.5)"
            pointColor = "#fff";
            addColorStop1 = "rgba(255, 255, 255, 0.3)";
            addColorStop2 = "rgba(255, 255, 255, 0.1)";
            addColorStop3 = "rgba(255, 255, 255, 0.005)";
            addColorStop4 = "rgba(255, 255, 255, 0.00001)";
          }
          console.log(document.querySelector('.currency').style);
          var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
          gradientStroke.addColorStop(0, "#80b6f4");
          gradientStroke.addColorStop(1, "#f49080");
          var gradientFill = ctx.createLinearGradient(0, 0, 0, 350);
          gradientFill.addColorStop(0, addColorStop1);
          gradientFill.addColorStop(0.3, addColorStop2);
          gradientFill.addColorStop(0.7, addColorStop3);
          gradientFill.addColorStop(1, addColorStop4);
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: `${elem.Cur_Abbreviation}`,
                borderColor: pointColor,
                pointBorderColor: pointColor,
                pointBackgroundColor: pointColor,
                pointHoverBackgroundColor: pointColor,
                pointHoverBorderColor: pointColor,
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 2,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: data
              }]
            },
            options: {
              legend: {
                position: "bottom"
              },
              scales: {
                yAxes: [{
                  ticks: {
                    display: true,
                    fontColor: fontColor,
                    fontStyle: "normal",
                    padding: 20
                  },
                  gridLines: {
                    drawTicks: true,
                    display: true
                  }
                }],
                xAxes: [{
                  gridLines: {
                    zeroLineColor: "transparent"
                  },
                  ticks: {
                    display: false,
                    fontColor: fontColor,
                    padding: 20,
                    fontStyle: "normal"
                  }
                }]
              }
            }
          });
        }
      })

    }
  }


}


function currenciesPattern(data, transitionDelay) {
  if ((data.Cur_Abbreviation === 'USD')) {
    localStorage.setItem('USDRate', data.Cur_OfficialRate);
  } else if (data.Cur_Abbreviation === 'EUR') {
    localStorage.setItem('EURRate', data.Cur_OfficialRate);
  }

  const ImageURL = data.Cur_ID === 145 ? URLImagesList[0] :
    data.Cur_ID === 292 ? URLImagesList[1] :
      data.Cur_ID === 310 ? URLImagesList[2] :
        data.Cur_ID === 298 ? URLImagesList[4] :
          data.Cur_ID === 130 ? URLImagesList[5] :
            data.Cur_ID === 302 ? URLImagesList[6] :
              data.Cur_ID === 143 ? URLImagesList[7] :
                URLImagesList[3];
  if (data.Cur_Name) {
    ratesStatistics.push({
      Cur_ID: data.Cur_ID,
      Cur_Name: data.Cur_Name,
      Cur_Abbreviation: data.Cur_Abbreviation,
      Cur_RateToday: data.Cur_OfficialRate
    });
    return `
        <button class="currencies__item currency ripple__button" style="animation-delay: ${transitionDelay}s;">
          <div class="currency__body">
            <div class="currency__img">
              <img src="${ImageURL}" alt="">
            </div>
            <div class="currency__content">
              <h4 class="currency__title">Валюта: ${data.Cur_Name} </h4>
              <p class="currrency__text">Текущий курс:<span class="currency__rate"> ${data.Cur_OfficialRate} </span></p>
            </div>
          </div>
        </button>
  `;
  }
  else
    return `
        <button class="currencies__item currency ripple__button" style="animation-delay: ${transitionDelay}s;">
          <div class="currency__body">
            <div class="currency__img">
              <img src="${ImageURL}" alt="">
            </div>
            <div class="currency__content">
              <h4 class="currency__title">Валюта: Bitcoin </h4>
              <p class="currrency__text">Текущий курс:<span class="currency__rate"> ${data.USD.last} </span></p>
            </div>
          </div>
        </button>
  `;
}



async function getRates(list) {
  let plusNumber = 0.2;
  if (window.innerWidth <= 535) {
    plusNumber = 0.11;
  }
  let transitionDelay = 0.2;
  currenciesBlock.innerHTML = '';
  list.forEach(url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        currenciesBlock.innerHTML += currenciesPattern(data, transitionDelay);
        transitionDelay += plusNumber;
      });
  });
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
      if (elem.type === 'USD') {
        this.ratesToConver.forEach(rateElem => {
          if (rateElem.type === 'USDRate') {
            convertedElemAmount = elemAmount * Number(rateElem.rate);
          }
        })
      } else if (elem.type === 'EUR') {
        this.ratesToConver.forEach(rateElem => {
          if (rateElem.type === 'EURRate') {
            convertedElemAmount = elemAmount * Number(rateElem.rate);
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
    this.getRatesToConvert();
    this.convertSaves();
    convertedElem.textContent = this.savingsBR
  }
}





// !  Функция инициализации (все события и прочее)
const init = () => {
  setSavings.getSaves();
  getRates(URLRatesList);

  function ripple(e) {
    const target = e.target;
    if (target.closest('.ripple__button')) {
      const closest = target.closest('.ripple__button');
      // console.log('cool');
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      let ripples = document.createElement('span');
      ripples.classList.add('ripple')
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      closest.appendChild(ripples);

      setTimeout(() => {
        ripples.remove();
      }, 700)
    }
  }

  document.addEventListener('click', e => {
    ripple(e);
  });

  topBarArrow.addEventListener('click', () => {
    topBar.classList.toggle('menu-active');
  })

  currenciesBlock.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.currency')) {
      const currencyElem = target.closest('.currency');
      let currencyElemTextContent = currencyElem.textContent;
      currencyElemTextContent = currencyElemTextContent.replace(/\s+/g, ' ').trim(); //! удаляет все лишние пробелы
      const ratePosIndex = currencyElemTextContent.indexOf("Текущий курс"); //! находит место "Текущий курс"     8
      const currencyName = currencyElemTextContent.slice(8, ratePosIndex - 1);
      getStatistics(currencyName, currencyElem);
    }
  })

  showFormButton.addEventListener('click', () => {      //*   вызывает окно с формой
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  clearLS.addEventListener('click', () => {
    localStorage.clear();
    setSavings.getSaves();
    getRates(URLRatesList);
    setSavings.getRatesToConvert();
  });

  savingAmountInputElem.addEventListener('input', function () {
    this.value = this.value.replace(inputPattern, '');
  });

  form.addEventListener('submit', e => {      //*   обработка отправки формы
    e.preventDefault();
    const message = 'Заполните все поля';
    const savingCurrencyAmount = Number(form.elements.savingCurrencyAmount.value);
    const savingCurrencyType = form.elements.savingCurrencyType.value;
    if (savingCurrencyType !== '' && savingCurrencyAmount !== '') {
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

  footerDate.textContent = new Date().toDateString();




  // ! ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲
  const todayObj = new Date();    //  сегодня, объект...   создаю новый объект даты на сегодняшнее число
  const todayStr = todayObj.toISOString();    //  сегодня, длинный строчный формат...   перевожу в формат "2021-02-09T15:49:39.773Z"
  const todayShort = todayStr.slice(0, 10);   //  сегодня, короткая форма....   получаю сегодняшнее число — копирую нужные мне отрезки (с 0-ой до 10 позиции) "2021-02-09"
  var firstDayOfYear = new Date();    // сегодня, объект (еще один)...   создаю еще один обьект Даты, чтобы получить первый день года (первое января)
  // firstDayOfYear.setMonth(firstDayOfYear.getMonth() - firstDayOfYear.getMonth());   //*  отнимаю число месяцев (получаю 0 - январь)
  firstDayOfYear.setDate(firstDayOfYear.getDate() - 20);    //*  начало периода (перевожу число на 7 дней назад [для статистики за неделю])...    отнимаю число дней + 1 (получаю 1-е число)
  var firstDayOfYearStr = firstDayOfYear.toISOString();   //  начало периода, длинный строчный формат...   перевожу в формат "2021-02-09T15:49:39.773Z"
  var firstDayOfYearShort = firstDayOfYearStr.slice(0, 10);   //  начало периода, короткая форма....    получаю начало года — копирую нужные мне отрезки (с 0-ой до 10 позиции) "2021-02-09"
  // console.log(`Сегодня: ${todayShort}`);
  // console.log(`Первого января: ${firstDayOfYearShort}`);
  const dynamicURL = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=${firstDayOfYearShort}&endDate=${todayShort}`;
  const URLStatisticsList = [
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/292?startDate=${firstDayOfYearShort}&endDate=${todayShort}`,      //? Евро
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=${firstDayOfYearShort}&endDate=${todayShort}`,      //? Доллар США
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/298?startDate=${firstDayOfYearShort}&endDate=${todayShort}`,      //? Российский рубль
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/302?startDate=${firstDayOfYearShort}&endDate=${todayShort}`,      //? Турецкая лира
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/130?startDate=${firstDayOfYearShort}&endDate=${todayShort}`,      //? Швейцарский франк
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/143?startDate=${firstDayOfYearShort}&endDate=${todayShort}`,      //? Фунт стерлингов
  ];
  getStatisticsRequest(URLStatisticsList);
  // ! ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼

}
// !  конец

document.addEventListener('DOMContentLoaded', init); //! вызов инициализирующей функции