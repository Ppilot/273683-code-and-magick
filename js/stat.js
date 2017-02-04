'use strict';

// DOM-элемент канваса
var canvas = document.querySelector('canvas');

// Контекст отрисовки
var canvasCtx = canvas.getContext('2d');

var cloudStartX = 100; // Начальная коодината облака (X)
var cloudStartY = 10; // Начальная коодината облака (Y)
var cloudWidth = 420; // Ширина облака
var cloudHeigth = 270; // Высота облака

// Фуникция формирования облака
var drawCloud = function (ctx, startX, startY, width, heigth, colorCloud) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.fillStyle = colorCloud;
  var lengthArcX = Math.round(width / 14);
  var lengthArcY = Math.round(heigth / 9);
  for (var i = 1; i < 10; i++) {
    ctx.quadraticCurveTo(startX - 8, startY - lengthArcY / 2 + (i * lengthArcY), startX, startY + (i * lengthArcY));
  }
  for (i = 1; i < 15; i++) {
    ctx.quadraticCurveTo(startX - lengthArcX / 2 + (i * lengthArcX), startY + heigth + 8, startX + (i * lengthArcX), startY + heigth);
  }
  for (i = 1; i < 10; i++) {
    ctx.quadraticCurveTo(startX + width + 8, startY + heigth - (i * lengthArcY) + lengthArcY / 2, startX + width, startY + heigth - (i * lengthArcY));
  }
  for (i = 1; i < 15; i++) {
    ctx.quadraticCurveTo(startX + width - (i * lengthArcX) + lengthArcX / 2, startY - 8, startX + width - (i * lengthArcX), startY);
  }
  ctx.closePath();
  ctx.fill();
};

// Рисуем тень облака
drawCloud(canvasCtx, cloudStartX + 10, cloudStartY + 10, cloudWidth, cloudHeigth, 'rgba(0, 0, 0, 0.7)');

// Рисуем облако
drawCloud(canvasCtx, cloudStartX, cloudStartY, cloudWidth, cloudHeigth, '#ffffff');

// Фомируем заголовок
canvasCtx.fillStyle = 'black';
canvasCtx.font = '16px PT Mono';
canvasCtx.fillText('Ура вы победили!', 240, 40);
canvasCtx.fillStyle = 'black';
canvasCtx.font = '16px PT Mono';
canvasCtx.fillText('Список результатов:', 225, 60);

// Функция формирования гитограмм
var renderStatistics = function (ctx, names, times) {
  var centerGraph; // Начальная точка первой гистограммы. Вычисляется автоматически и зависит от количества столбцов.
  var timesPlayers;

  // Поиск максимального элемента из массива времени
  for (var i = 0, timesMax = times[0]; i < times.length; i++) {
    if (timesMax < times[i]) {
      timesMax = times[i];
    }
  }
  // Рисование гистограммы
  centerGraph = cloudStartX + (cloudWidth - (times.length * 40 + (times.length - 1) * 50)) / 2;
  for (i = 0; i < times.length; i++) {
    ctx.beginPath();
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 254,' + (0.2 + (0.9 - 0.2) * Math.random()) + ')';
    }
    timesPlayers = Math.round(times[i] / timesMax * 150);
    ctx.fillRect(centerGraph + i * 90, cloudHeigth + cloudStartY - 30 - timesPlayers, 40, timesPlayers);
    ctx.fillText(Math.round(times[i]), centerGraph + i * 90, cloudHeigth + cloudStartY - 40 - timesPlayers);
    ctx.fillText(names[i], centerGraph + i * 90, cloudHeigth + cloudStartY - 10);
    ctx.closePath();
    ctx.fill();
  }
};
window.renderStatistics = renderStatistics;
