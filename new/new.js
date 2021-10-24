"use strict";
const $realgame = document.getElementById("real");
const $gameBtn = document.getElementById("gameBtn");
const $score = document.getElementById("score");
const $bestscore = document.getElementById("bestscore");
let data = [];

// 게임시작
function startGame() {
  [1, 2, 3, 4].forEach(function () {
      const rowData = [];
      data.push(rowData);
      [1, 2, 3, 4].forEach(() => {
          rowData.push(0);
      });
  });
}

startGame();