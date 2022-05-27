/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

import { number, btn, validateBox } from './app';

function moonAlgorithm(setValue) {
  let ch = 0; // счетчик суммы
  const num = String(setValue).replace(/\D/g, ''); // убираем не числа
  const isOdd = num.length % 2 !== 0; // проверяем четность

  if (num === '') return false; // возвращаем false, если нет номера карты

  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10); // делаем из строки обратно число для каждого элемента

    ch += (isOdd | 0) === (i % 2) && (n *= 2) > 9 ? (n - 9) : n;
  }
  return (ch % 10) === 0;
}

export default function checkCorrection(event) {
  event.preventDefault();
  validateBox.textContent = '';
  validateBox.classList.remove('red');
  validateBox.classList.remove('green');
  if (moonAlgorithm(number.value)) {
    validateBox.textContent = 'Проверка номера карты пройдена успешно';
    validateBox.classList.add('green');
  } else {
    validateBox.textContent = 'Некорректный номер карты';
    validateBox.classList.add('red');
  }
}

btn.addEventListener('click', checkCorrection);
