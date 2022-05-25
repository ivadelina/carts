/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
const number = document.getElementById('card_number');
const btn = document.getElementById('submitform');
const mir = document.querySelector('.mir');
const visa = document.querySelector('.visa');
const mastercart = document.querySelector('.mastercart');
const allcarts = Array.from(document.querySelectorAll('.cart'));
const resultBox = document.querySelector('.paySystemResult');
const validateBox = document.querySelector('.validateBox');

btn.addEventListener('click', checkCorrection);
btn.addEventListener('click', checkPaySystem);

function checkPaySystem(event) {
  event.preventDefault();
  for (const el of allcarts) {
    el.classList.remove('hide');
  }
  resultBox.textContent = '';
  if (number.value[0] == 2) {
    visa.classList.add('hide');
    mastercart.classList.add('hide');
    resultBox.append('МИР');
  } else if (number.value[0] == 4) {
    mir.classList.add('hide');
    mastercart.classList.add('hide');
    resultBox.append('VISA');
  } else if (/^51|52|53|54|55/.test(number.value)) {
    mir.classList.add('hide');
    visa.classList.add('hide');
    resultBox.append('MasterCard');
  }
}

function checkCorrection(event) {
  event.preventDefault();
  validateBox.textContent = '';
  if (number.value.length === 16) {
    validateBox.textContent = 'Проверка номера карты пройдена успешно';
    validateBox.classList.add('green');
  } else {
    validateBox.textContent = 'Некорректный номер карты';
    validateBox.classList.add('red');
  }
}
function Moon_Algorithm(setValue) {
  let ch = 0;
  const num = String(setValue).replace(/\D/g, ''); // Убираем все не числа
  const isOdd = num.length % 2 !== 0; // Проверяем четность

  if (num === '') return false; // Некорректный номер карты

  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10);

    ch += (isOdd | 0) === (i % 2) && (n *= 2) > 9 ? (n - 9) : n;
  }

  return (ch % 10) === 0;
}
