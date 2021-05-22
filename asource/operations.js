
//?  dollar $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//?  euro €€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€
//?  pound ££££££££££££££££££££££££££££££££££££££££££££££££
//?  rouble ₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽₽

class Currency {
  // TODO реализовать конструктор
  Cur_ID = 0;
  Cur_Name = "";
  Cur_Abbreviation = "";
  Cur_OfficialRate = 0;

  //* конструктор
  //* id 
  //* название валюты
  //* текущий курс
  //* масштаб scale 
  //* статистика валюты для графика
  //? Метод получения статистики
  //? HTML шаблон
  //? Метод рендера (вставка элемента в HTML)

}



class Saving extends Currency {
  // TODO вызвать ротительский конструктор

  //* конструктор
  //* количество
  //* ковертировано
  //? Метод ковертировать
  //? Метод записи в localStorage
  //? HTML шаблон
  //? Метод рендера (вставка элемента в HTML)

}



const init = () => {
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
}
document.addEventListener('DOMContentLoaded', init);