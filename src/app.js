const number = document.getElementById('card_number');
const btn = document.getElementById('submitform');
const mir = document.querySelector('.mir');
const visa = document.querySelector('.visa');
const mastercart = document.querySelector('.mastercart');
const allcarts = Array.from(document.querySelectorAll('.cart'));
const resultBox = document.querySelector('.paySystemResult');
const validateBox = document.querySelector('.validateBox');

export {
  number, btn, mir, visa, mastercart, allcarts, resultBox, validateBox,
};
