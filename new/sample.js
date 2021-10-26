"use strict";

import $position from "./new.js";
const $realgame = document.getElementById("real");
const $gameBtn = document.getElementById("gameBtn");
const $score = document.getElementById("score");
const $bestscore = document.getElementById("bestscore");
let data = [];

// 콘솔
function cl(i) {
  console.log(i);
}

// 게임시작
function startGame() {
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
    });
  });
  putcell();
  draw();
}

// 랜덤숫자 위치
function putcell() {
  const emptycell = [];
  data.forEach(function (rowdata, i) {
    rowdata.forEach(function (celldata, j) {
      if (!celldata) {
        emptycell.push([i, j]);
      }
    });
  });
  const randomCell = emptycell[Math.floor(Math.random() * emptycell.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

// 그려넣기
function draw() {
  data.forEach((rowdata, i) => {
    rowdata.forEach((celldata, j) => {
      if (celldata > 0) {
        let $target = creatediv($position[i][j]);
        $target.textContent = celldata;
				$target.setAttribute('data-num',celldata);
      }
    });
  });
}

// div만들고 위치 넣기
function creatediv(position) {
  const $fragment = document.createDocumentFragment();
  const $div = document.createElement("div");
  $div.classList.add(position);
  console.log(position)
  if(!$realgame.querySelector(`.${position}`)){
    $fragment.appendChild($div);
    $realgame.appendChild($fragment);
  }
  return $div;
}

startGame();
// data = [
//   [0, 2, 2, 2],
//   [0, 2, 2, 2],
//   [1024, 1024, 0, 0],
//   [0, 0, 0, 2],
// ];
// draw();

// 움직이게
function movecell(direction) {
  switch (direction) {
    case "left": {
      const newdata = [[], [], [], []];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (celldata) {
            const currentRow = newdata[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === celldata) {
              // 이전 값과 지금 값이 같으면
              $realgame.querySelector(`.${$position[i][j]}`).remove();
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newdata[i].push(celldata);
              prevpos[i].push($position[i][j]);
            }
          }
        });
      });
      newdata.forEach((row, i) => {
        row.forEach((cell, j) => {
          if(cell){
            $realgame.querySelector(`.${prevpos[i][j]}`).className = $position[i][j];
          }
        });
      });

      [1, 2, 3, 4].forEach((rowdata, i) => {
        [1, 2, 3, 4].forEach((celldata, j) => {
          data[i][j] = Math.abs(newdata[i][j]) || 0;
          if(data[i][j] > 0){
            $realgame.querySelector(`.${$position[i][j]}`).textContent = data[i][j];
            $realgame.querySelector(`.${$position[i][j]}`).setAttribute('data-num',data[i][j]);
          }
        });
      });
      break;
    }
    case "right": {
      const newdata = [[], [], [], []];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (rowData[3 - j]) {
            const currentRow = newdata[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === rowData[3 - j]) {
              // 이전 값과 지금 값이 같으면
              $realgame.querySelector(`.${$position[i][3 - j]}`).remove();
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newdata[i].push(rowData[3 - j]);
              prevpos[i].push($position[i][3 - j]);
            }
          }
        });
      });
      newdata.forEach((row, i) => {
        row.forEach((cell, j) => {
          if(cell){
            $realgame.querySelector(`.${prevpos[i][j]}`).className = $position[i][3 - j];
          }
        });
      });

      [1, 2, 3, 4].forEach((rowdata, i) => {
        [1, 2, 3, 4].forEach((celldata, j) => {
					data[i][3 - j] = Math.abs(newdata[i][j]) || 0;
          if(data[i][3 - j] > 0){
            $realgame.querySelector(`.${$position[i][3 - j]}`).textContent = data[i][3 - j];
            $realgame.querySelector(`.${$position[i][3 - j]}`).setAttribute('data-num',data[i][3 - j]);
          }
        });
      });
      break;
    }
    case "up": {
      const newdata = [[], [], [], []];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (celldata) {
						const currentRow = newdata[j];
						const prevData = currentRow[currentRow.length - 1];
            if (prevData === celldata) {
              // 이전 값과 지금 값이 같으면
              $realgame.querySelector(`.${$position[i][j]}`).remove();
              currentRow[currentRow.length - 1] *= -2;
            } else {
							newdata[j].push(celldata);
              prevpos[j].push($position[i][j]);
            }
          }
        });
      });
      newdata.forEach((row, i) => {
        row.forEach((cell, j) => {
          if(cell){
            $realgame.querySelector(`.${prevpos[i][j]}`).className = $position[j][i];
          }
        });
      });

      [1, 2, 3, 4].forEach((rowdata, i) => {
        [1, 2, 3, 4].forEach((celldata, j) => {
					data[j][i] = Math.abs(newdata[i][j]) || 0;
          if(data[j][i] > 0){
            $realgame.querySelector(`.${$position[j][i]}`).textContent = data[j][i];
            $realgame.querySelector(`.${$position[j][i]}`).setAttribute('data-num',data[j][i]);
          }
        });
      });
      break;
    }
    case "down": {
      const newdata = [[], [], [], []];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (data[3 - i][j]) {
						const currentRow = newdata[j];
						const prevData = currentRow[currentRow.length - 1];
            if (prevData === data[3 - i][j]) {
              // 이전 값과 지금 값이 같으면
              $realgame.querySelector(`.${$position[3 - i][j]}`).remove();
              currentRow[currentRow.length - 1] *= -2;
              // cl($position[3 - i][j]);
            } else {
							newdata[j].push(data[3 - i][j]);
              prevpos[j].push($position[3 - i][j]);
            }
          }
        });
      });
      newdata.forEach((row, i) => {
        row.forEach((cell, j) => {
          if(cell){
            $realgame.querySelector(`.${prevpos[i][j]}`).className = $position[3 - j][i];
          }
        });
      });

      [1, 2, 3, 4].forEach((rowdata, i) => {
        [1, 2, 3, 4].forEach((celldata, j) => {
					data[3 - j][i] = Math.abs(newdata[i][j]) || 0;
          if(data[3 - j][i] > 0){
            $realgame.querySelector(`.${$position[3 - j][i]}`).textContent = data[3 - j][i];
            $realgame.querySelector(`.${$position[3 - j][i]}`).setAttribute('data-num',data[3 - j][i]);
          }
        });
      });
      break;
    }
  }
  // cl(data)
  putcell();
  draw();
}

// 키보드
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    movecell("up");
  } else if (e.key === "ArrowDown") {
    movecell("down");
  } else if (e.key === "ArrowLeft") {
    movecell("left");
  } else if (e.key === "ArrowRight") {
    movecell("right");
  }
});
