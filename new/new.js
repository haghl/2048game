"use strict";
const $realgame = document.getElementById("real");
const $gameBtn = document.getElementById("gameBtn");
const $score = document.getElementById("score");
const $bestscore = document.getElementById("bestscore");
let data = [];
let pos = [];

// 콘솔
function cl(i){
  console.log(i);
}

// 게임시작
function startGame() {
  [1, 2, 3, 4].forEach(function (i) {
    const rowData = [];
      data.push(rowData);
      pos.push(i - 1);
      [1, 2, 3, 4].forEach((j) => {
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

// div만들고 위치 넣기
function creatediv(position){
	const $fragment = document.createDocumentFragment();
  const $div = document.createElement('div');
  $div.classList.add(position);

	$fragment.appendChild($div);
	$realgame.appendChild($fragment);
  return $div;
}

// 그려넣기
function draw() {
	data.forEach((rowdata, i) => {
		rowdata.forEach((celldata, j) => {
      let position = 'position' + i + '_' + j;
			if (celldata > 0) {
        let $target = creatediv(position);
				$target.textContent = celldata;
				$target.classList.add("num" + celldata);
			}
		});
	});
}

// startGame();
data = [
    [2,2,2,2],
    [2,2,2,2],
    [1024,1024,0,0],
    [0,0,0,2],
]
draw();


// 움직이게
function movecell(direction) {
	switch (direction) {
		case "left": {
			const newdata = [[], [], [], []];
      // const num = [];
			data.forEach((rowData, i) => {
				rowData.forEach((celldata, j) => {
          let position = 'position' + i + '_' + j;
					if (celldata) {
						const currentRow = newdata[i];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === celldata) {
							// 이전 값과 지금 값이 같으면
							currentRow[currentRow.length - 1] *= -2;

						} else {
							newdata[i].push(celldata);
						}
					}
				});
			});
      

			[1, 2, 3, 4].forEach((rowdata, i) => {
				[1, 2, 3, 4].forEach((celldata, j) => {
          cl(newdata[i])
					data[i][j] = Math.abs(newdata[i][j]) || 0;
				});
			});
			break;
		}
	}

	// draw();

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