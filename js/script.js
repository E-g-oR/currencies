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

// TODO тестовые данные для графика
// const chartTestData = {
//   labels: ['02.13', '02.14', '02.15', '02.16', '02.17', '02.18', '02.19', '02.20'],
//   series: [
//     ['3.8783', '3.5216', '3.983', '3.6125', '3.1930', '3.1736', '3.7263', '3.4172',]
//   ]
// }
var options = {
  // не отрисовывать точки линейного графика
  showPoint: true,
  // Отключение сглаживания линий
  lineSmooth: false,
  // Настройки X-оси
  showArea: true,
  axisX: {
    // Отключаем сетку для этой оси
    offset: 10,
    showGrid: true,
    // и не показываем метки
    showLabel: true
  },
  // настройки Y-оси 
  axisY: {
    // Смещение от меток
    offset: 45,
    // Функция интерполяции метки позволяет менять значение метки,
    // в текущем примере появляются миллионы "m".
    // labelInterpolationFnc: function (value) {
    //   return '' + value + 'm';
    // }
  }
};



const savingPattern = (data) => {
  return `        
    <div class="savings__item saving">
      <span class="saving__text">
        <span class="saving__currency">${data.type}</span>
        <span class="saving__amount">${data.amount}</span>
      </span>
    </div>`
}

const getStatisticsRequest = (URLStatisticsList) => {
  URLStatisticsList.forEach(statisticsURL => {
    fetch(statisticsURL)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let objectCurId = data[0].Cur_ID;
        // console.log(objectCurId);
        ratesStatistics.forEach(elem => {
          if (elem.Cur_ID === objectCurId) {
            elem.statistics = data;
          }
        })
        //         console.log(`Курс неделю назад: ${data[0].Cur_OfficialRate};
        // Курс сегодня: ${data[data.length - 1].Cur_OfficialRate};`);
      })
  })
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
          // chartData.labels = [];
          // chartData.series[0] = [];
          elemStatistics.forEach(statisticsElem => {
            const shortDate = statisticsElem.Date.slice(5, 10).replace('-', '.');
            statisticsElem.Date = shortDate;
            // chartData.labels.push(shortDate); //? chartist.js
            labels.push(shortDate); //! chart.js
            data.push(statisticsElem.Cur_OfficialRate); //! chart.js
            // chartData.series[0].push(statisticsElem.Cur_OfficialRate); //? chartist.js
            // addRowsNewArray.push([shortDate, statisticsElem.Cur_OfficialRate]) //* google charts
          })
          currencyElem.innerHTML += chartHTML;
          // ! const chartDraw = new Chartist.Line(`#${elem.Cur_Abbreviation}-linear-chart`, chartData, options);
          var ctx = document.getElementById(`${elem.Cur_Abbreviation}-linear-chart`).getContext("2d");

          var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
          gradientStroke.addColorStop(0, "#80b6f4");
          gradientStroke.addColorStop(1, "#f49080");
          var gradientFill = ctx.createLinearGradient(0, 0, 0, 350);
          gradientFill.addColorStop(0, "rgba(255, 255, 255, 0.3)");
          gradientFill.addColorStop(0.3, "rgba(255, 255, 255, 0.1)");
          gradientFill.addColorStop(0.7, "rgba(255, 255, 255, 0.005)");
          gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.00001)");
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: `${elem.Cur_Abbreviation}`,
                borderColor: "#fff",
                pointBorderColor: "#fff",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#fff",
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
                    fontColor: "rgba(255,255,255,0.5)",
                    fontStyle: "normal",
                    // beginAtZero: true,
                    // maxTicksLimit: 5,
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
                    fontColor: "rgba(255,255,255,0.5)",
                    padding: 20,
                    // fontColor: "rgba(0,0,0,0.5)",
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

  // console.dir(addRowsNewArray);

}


const currenciesPattern = (data, transitionDelay) => {        //? шаблон элемента с курсом валют: записывает курс евро и доллара, добавляет объект в массив со статистикой
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
  // console.log(data);
  if (data.Cur_Name) {
    ratesStatistics.push({
      Cur_ID: data.Cur_ID,
      Cur_Name: data.Cur_Name,
      Cur_Abbreviation: data.Cur_Abbreviation,
      Cur_RateToday: data.Cur_OfficialRate
    });
    return `
        <div class="currencies__item currency" style="animation-delay: ${transitionDelay}s;">
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
  }
  else return `
        <div class="currencies__item currency" style="animation-delay: ${transitionDelay}s;">
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
  let plusNumber = 0.2;
  if (window.innerWidth <= 535) {
    plusNumber = 0.11;
  }
  let transitionDelay = 0.2;
  // TODO убрать коменты
  currenciesBlock.innerHTML = '';
  list.forEach(url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        currenciesBlock.innerHTML += currenciesPattern(data, transitionDelay);
        transitionDelay += plusNumber;
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
  // console.log(ratesStatistics);

  // console.log(chartTestData);
  // new Chartist.Line('#linear', chartTestData, testOptions);


  topBarArrow.addEventListener('click', () => {
    topBar.classList.toggle('menu-active');
  })

  currenciesBlock.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.currency')) {
      const currencyElem = target.closest('.currency');
      let currencyElemTextContent = currencyElem.textContent;
      currencyElemTextContent = currencyElemTextContent.replace(/\s+/g, ' ').trim(); //! удаляет все лишние пробелы
      // console.log(currencyElemTextContent);
      const ratePosIndex = currencyElemTextContent.indexOf("Текущий курс"); //! находит место "Текущий курс"     8
      // !   8
      // console.log(ratePosIndex);
      const currencyName = currencyElemTextContent.slice(8, ratePosIndex - 1);
      // console.log(currencyName);
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
  // console.log(ratesStatistics);
}
// !  конец

document.addEventListener('DOMContentLoaded', init); //! вызов инициализирующей функции