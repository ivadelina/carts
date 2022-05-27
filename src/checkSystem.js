/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */

import {
  number, btn, mir, visa, mastercart, allcarts, resultBox,
} from './app';

export default function checkPaySystem(event) {
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

btn.addEventListener('click', checkPaySystem);
