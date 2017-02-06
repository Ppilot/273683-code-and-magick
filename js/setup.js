'use strict';

//  Открываем и закрываем окно, воодим ограничения на длину имени
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

setupOpen.addEventListener('click', function () {
  setup.classList.remove('invisible');
});

setupClose.addEventListener('click', function () {
  setup.classList.add('invisible');
});

var userName = setup.querySelector('.setup-user-name');
userName.setAttribute('required', true);
userName.setAttribute('maxlength', 50);

// Функция случайного возвражающая случайный индекс для массива
var getRandomColorSet = function (set) {
  var randomElementIndex = Math.floor(Math.random() * set);
  return randomElementIndex;
};

// Меняем цвет накидки мага слуйным образом из списка при клике.
var wizardCoat = document.querySelector('#wizard-coat');
var wizardCoatColorsRange = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = wizardCoatColorsRange[getRandomColorSet(wizardCoatColorsRange.length)];
});

// Меняем цвет глаз мага слуйным образом из списка при клике.
var wizardEyes = document.querySelector('#wizard-eyes');
var wizardEyesColorsRange = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = wizardEyesColorsRange[getRandomColorSet(wizardEyesColorsRange.length)];
});

// Меняем цвет фаербола мага слуйным образом из списка при клике.
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballColorsRange = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = wizardFireballColorsRange[getRandomColorSet(wizardFireballColorsRange.length)];
});

