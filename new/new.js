"use strict";
const $realgame = document.getElementById("real");
const $gameBtn = document.getElementById("gameBtn");
const $score = document.getElementById("score");
const $bestscore = document.getElementById("bestscore");
let data = [];

function startgame() {
  [1, 2, 3, 4].forEach(() => {
    let rowdata = [];
    data.push(rowdata);
    [1, 2, 3, 4].forEach((i) => {
      rowdata.push(0);
      // let div = document.createElement('div');
    });
  });

  putcell();
  draw();
}

// 랜덤숫자
function putcell() {
  const emptycell = [];
  data.forEach((rowdata, i) => {
    rowdata.forEach((celldata, j) => {
      if (!celldata) {
        emptycell.push([i, j]);
      }
    });
  });
  const randomCell = emptycell[Math.floor(Math.random() * emptycell.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

// 그려넣기
function draw(){
  data.forEach((rowdata, i) => {
      rowdata.forEach((celldata, j) => {
          const $target = $realgame.children[i].children[j];
          if(celldata > 0){
              $target.textContent = celldata;
              $target.className = 'num' + celldata;
          } else{
              $target.textContent = '';
              $target.className = '';
          }
      });
  });
}

startgame();

// 움직이게
// function movecell(direction){
//   switch(direction){
//       case 'left': {
//           const newdata = [[],[],[],[]];
//           data.forEach((rowData, i) => {
//               rowData.forEach((celldata, j) => {
//                   if(celldata){
//                       const currentRow = newdata[i];
//                       const prevData = currentRow[currentRow.length - 1];
//                       if(prevData === celldata){// 이전 값과 지금 값이 같으면
//                           currentRow[currentRow.length - 1] *= -2;
//                       } else {
//                           newdata[i].push(celldata);
//                       }
//                   }
//               });
//           });
//           console.log(newdata);
//           [1,2,3,4].forEach((rowdata, i) => {
//               [1,2,3,4].forEach((celldata, j) => {
//                   data[i][j] = Math.abs(newdata[i][j]) || 0;
//               });
//           });
//           break;
//       }

//       case 'right': {
//           const newdata = [[],[],[],[]];
//           data.forEach((rowData, i) => {
//               rowData.forEach((celldata, j) => {
//                   if(rowData[3 - j]){
//                       const currentRow = newdata[i];
//                       const prevData = currentRow[currentRow.length - 1];
//                       if(prevData === rowData[3 - j]){// 이전 값과 지금 값이 같으면
//                           currentRow[currentRow.length - 1] *= -2;
//                       } else {
//                           newdata[i].push(rowData[3 - j]);
//                       }
//                   }
//               });
//           });
//           console.log(newdata);
//           [1,2,3,4].forEach((rowdata, i) => {
//               [1,2,3,4].forEach((celldata, j) => {
//                   data[i][3 - j] = Math.abs(newdata[i][j]) || 0;
//               });
//           });
//           break;
//       }

//       case 'up': {
//           const newdata = [[],[],[],[]];
//           data.forEach((rowData, i) => {
//               rowData.forEach((celldata, j) => {
//                   if(celldata){
//                       const currentRow = newdata[j];
//                       const prevData = currentRow[currentRow.length - 1];
//                       if(prevData === celldata){// 이전 값과 지금 값이 같으면
//                           currentRow[currentRow.length - 1] *= -2;
//                       } else {
//                           newdata[j].push(celldata);
//                       }
//                   }
//               });
//           });
//           console.log(newdata);
//           [1,2,3,4].forEach((rowdata, i) => {
//               [1,2,3,4].forEach((celldata, j) => {
//                   data[j][i] = Math.abs(newdata[i][j]) || 0;
//               });
//           });
//           break;
//       }

//       case 'down': {
//           const newdata = [[],[],[],[]];
//           data.forEach((rowData, i) => {
//               rowData.forEach((celldata, j) => {
//                   if(data[3 - i][j]){
//                       const currentRow = newdata[j];
//                       const prevData = currentRow[currentRow.length - 1];
//                       if(prevData === data[3 - i][j]){// 이전 값과 지금 값이 같으면
//                           currentRow[currentRow.length - 1] *= -2;
//                       } else {
//                           newdata[j].push(data[3 - i][j]);
//                       }
//                   }
//               });
//           });
//           console.log(newdata);
//           [1,2,3,4].forEach((rowdata, i) => {
//               [1,2,3,4].forEach((celldata, j) => {
//                   data[3 - j][i] = Math.abs(newdata[i][j]) || 0;
//               });
//           });
//           break;
//       }

//   }
//   putcell();
//   draw();
// }

// window.addEventListener('keyup',(e) => {
//   if(e.key === 'ArrowUp'){
//       movecell('up');
//   } else if(e.key === 'ArrowDown'){
//       movecell('down');
//   } else if(e.key === 'ArrowLeft'){
//       movecell('left');
//   } else if(e.key === 'ArrowRight'){
//       movecell('right');
//   }
// });

// let startCoord;
// window.addEventListener('mousedown', (event) => {
//   startCoord = [event.clientX, event.clientY];
// });
// window.addEventListener('mouseup', (event) => {
//   const endCoord = [event.clientX, event.clientY];
//   const diffX = endCoord[0] - startCoord[0];
//   const diffY = endCoord[1] - startCoord[1];
//   if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
//       movecell('left');
//   } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
//       movecell('right');
//   } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
//       movecell('down');
//   } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
//       movecell('up');
//   }
// });
