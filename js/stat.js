'use strict';

// DOM-элемент канваса
var canvas = document.querySelector('canvas');

// Контекст отрисовки
var ctx = canvas.getContext('2d');

var moveX = 100; // Начальная коодината облака (X)
var moveY = 10; // Начальная коодината облака (Y)
var width = 420; // Ширина облака
var heigth = 270; // Высота облака
var centerGraph; // Начальная точка первой гистограммы. Вычисляется автоматически и зависит от количества столбцов.
var timesPlayers;

// Фуникция формирования облака
var drawCloud = function (ctx1, moveX1, moveY1, width1, heigth1, colorCloud) {
  ctx1.beginPath();
  ctx1.moveTo(moveX1, moveY1);
  ctx1.fillStyle = colorCloud;
  var lengthArcX = Math.round(width1 / 14);
  var lengthArcY = Math.round(heigth1 / 9);
  for (var i = 1; i < 10; i++) {
    ctx1.quadraticCurveTo(moveX1 - 8, moveY1 - lengthArcY / 2 + (i * lengthArcY), moveX1, moveY1 + (i * lengthArcY));
  }
  for (i = 1; i < 15; i++) {
    ctx1.quadraticCurveTo(moveX1 - lengthArcX / 2 + (i * lengthArcX), moveY1 + heigth1 + 8, moveX1 + (i * lengthArcX), moveY1 + heigth1);
  }
  for (i = 1; i < 10; i++) {
    ctx1.quadraticCurveTo(moveX1 + width1 + 8, moveY1 + heigth1 - (i * lengthArcY) + lengthArcY / 2, moveX1 + width1, moveY1 + heigth1 - (i * lengthArcY));
  }
  for (i = 1; i < 15; i++) {
    ctx1.quadraticCurveTo(moveX1 + width1 - (i * lengthArcX) + lengthArcX / 2, moveY1 - 8, moveX1 + width1 - (i * lengthArcX), moveY1);
  }
  ctx1.closePath();
  ctx1.fill();
};

// Рисуем тень облака
drawCloud(ctx, moveX + 10, moveY + 10, width, heigth, 'rgba(0, 0, 0, 0.7)');

// Рисуем облако
drawCloud(ctx, moveX, moveY, width, heigth, '#ffffff');

// Фомируем заголовок
ctx.fillStyle = 'black';
ctx.font = '16px PT Mono';
ctx.fillText('Ура вы победили!', 240, 40);
ctx.fillStyle = 'black';
ctx.font = '16px PT Mono';
ctx.fillText('Список результатов:', 225, 60);

// Функция формирования гитограмм
var renderStatistics = function (ctx, names, times) {

  // Поиск максимального элемента из массива времени
  for (var i = 0, timesMax = times[0]; i < times.length; i++) {
    if (timesMax < times[i]) {
      timesMax = times[i];
    }
  }
  // Рисование гистограммы
  centerGraph = (width - (times.length * 40 + (times.length - 1) * 50)) / 2;
  for (i = 0; i < times.length; i++) {
    ctx.beginPath();
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 254,' + (0.2 + (0.9 - 0.2) * Math.random()) + ')';
    }
    timesPlayers = Math.round(times[i] / timesMax * 150);
    ctx.fillRect(moveX + centerGraph + i * 90, heigth + moveY - 30 - timesPlayers, 40, timesPlayers);
    ctx.fillText(Math.round(times[i]), moveX + centerGraph + i * 90, heigth + moveY - 40 - timesPlayers);
    ctx.fillText(names[i], moveX + centerGraph + i * 90, heigth + moveY - 10);
    ctx.closePath();
    ctx.fill();
  }
};
window.renderStatistics = renderStatistics;
