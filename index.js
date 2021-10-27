"use strict";

// 변수
const $gameBtn = document.getElementById("gameBtn");
const $score = document.getElementById("score");
const $bestscore = document.getElementById("bestscore");
const $gamebody = document.getElementById("gamebody");
let data = [];
let scorenum = $score.querySelector(".scorenum");
let bestscore = $bestscore.querySelector(".bestnum");
let audio = new Audio();

bestscore.textContent = localStorage.getItem("best") || 0;

// $table -> $fragment -> $tr -> $td
// 게임시작
function startGame() {
	const $fragment = document.createDocumentFragment();
	[1, 2, 3, 4].forEach(function () {
		const rowData = [];
		data.push(rowData);
		const $tr = document.createElement("tr");
		[1, 2, 3, 4].forEach(() => {
			rowData.push(0);
			const $td = document.createElement("td");
			$tr.appendChild($td);
		});
		$fragment.appendChild($tr);
	});
	$gamebody.appendChild($fragment);
  [1,2].forEach(()=>{
    putcell();
    draw();
  })
}

// 랜덤숫자
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
			const $target = $gamebody.children[i].children[j];
			if (celldata > 0) {
				$target.textContent = celldata;
				$target.className = "num" + celldata;
			} else {
				$target.textContent = "";
				$target.className = "";
			}
		});
	});
}


startGame();
// data = [
//     [0,0,0,0],
//     [4,4,2,2],
//     [1024,1024,1024,1024],
//     [8,2,8,16],
// ]
// // draw();

// 움직이게
function movecell(direction) {
  let effect = new Audio('new/mp3/movesound.mp3');
	switch (direction) {
		case "left": {
			const newdata = [[], [], [], []];
      const num = [];
			data.forEach((rowData, i) => {
				rowData.forEach((celldata, j) => {
					if (celldata) {
						const currentRow = newdata[i];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === celldata) {
							// 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);
              
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
							currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
						} else {
							newdata[i].push(celldata);
						}
					}
				});
			});

      // 스코어 점수 넣기
      let plusnum = 0;
      num.forEach((i) => {
        plusnum += i;
      });
      if (plusnum > 0){
        plus(plusnum);
      }

			[1, 2, 3, 4].forEach((rowdata, i) => {
				[1, 2, 3, 4].forEach((celldata, j) => {
					data[i][j] = Math.abs(newdata[i][j]) || 0;
				});
			});
      effect.play();
			break;
		}

		case "right": {
			const newdata = [[], [], [], []];
      const num = [];
			data.forEach((rowData, i) => {
				rowData.forEach((celldata, j) => {
					if (rowData[3 - j]) {
						const currentRow = newdata[i];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === rowData[3 - j]) {
							// 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
							currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
						} else {
							newdata[i].push(rowData[3 - j]);
						}
					}
				});
			});

      // 스코어 점수 넣기
      let plusnum = 0;
      num.forEach((i) => {
        plusnum += i;
      });
      if (plusnum > 0){
        plus(plusnum);
      }
			[1, 2, 3, 4].forEach((rowdata, i) => {
				[1, 2, 3, 4].forEach((celldata, j) => {
					data[i][3 - j] = Math.abs(newdata[i][j]) || 0;
				});
			});
      effect.play();
			break;
		}

		case "up": {
			const newdata = [[], [], [], []];
      const num = [];
			data.forEach((rowData, i) => {
				rowData.forEach((celldata, j) => {
					if (celldata) {
						const currentRow = newdata[j];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === celldata) {
							// 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
							currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
						} else {
							newdata[j].push(celldata);
						}
					}
				});
			});
      
      // 스코어 점수 넣기
      let plusnum = 0;
      num.forEach((i) => {
        plusnum += i;
      });
      if (plusnum > 0){
        plus(plusnum);
      }
			[1, 2, 3, 4].forEach((rowdata, i) => {
				[1, 2, 3, 4].forEach((celldata, j) => {
					data[j][i] = Math.abs(newdata[i][j]) || 0;
				});
			});
      effect.play();
			break;
		}

		case "down": {
			const newdata = [[], [], [], []];
      const num = [];
			data.forEach((rowData, i) => {
				rowData.forEach((celldata, j) => {
					if (data[3 - i][j]) {
						const currentRow = newdata[j];
						const prevData = currentRow[currentRow.length - 1];
						if (prevData === data[3 - i][j]) {
							// 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);

							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
							currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
						} else {
							newdata[j].push(data[3 - i][j]);
						}
					}
				});
			});
      
      // 스코어 점수 넣기
      let plusnum = 0;
      num.forEach((i) => {
        plusnum += i;
      });
      if (plusnum > 0){
        plus(plusnum);
      }
			[1, 2, 3, 4].forEach((rowdata, i) => {
				[1, 2, 3, 4].forEach((celldata, j) => {
					data[3 - j][i] = Math.abs(newdata[i][j]) || 0;
				});
			});
      effect.play();
			break;
		}
	}

	putcell();
	draw();

	if (data.flat().includes(2048)) {
    audio.src = 'new/mp3/victoty.mp3';
    audio.play();
    
		setTimeout(() => {
			alert("축하합니다 2048을 만드셨어요!");
			local(scorenum.textContent);
      reset();
		}, 50);
	} else if (!data.flat().includes(0)){
    audio.src = 'new/mp3/lose.mp3';
    audio.play();
    // alert가 먼저 들어가서 셋타임 걸음
		setTimeout(() => {
      alert(`여기까지~ 점수는 ${scorenum.textContent}점`);
			local(scorenum.textContent);
      reset();
		}, 50);
	}

}

// 점수 추가되는 애니메이션
function plus(i) {
	let $fragment = document.createDocumentFragment();
	let $span = document.createElement("span");
	$span.classList.add("plusnum");
	$span.textContent = "+" + (i * 2);
	$fragment.appendChild($span);
	$score.children[0].appendChild($fragment);
	setTimeout(() => {
		$span.remove();
	}, 700);
}

// 최고 점수
function local(best) {
	let $bestscore = Number(localStorage.getItem("best"));
	if ($bestscore == null) {
		$bestscore = best;
	} else if ($bestscore < best) {
		$bestscore = best;
	} else {
		$bestscore;
	}

	localStorage.setItem("best", $bestscore);
	bestscore.textContent = $bestscore;
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


// 마우스
let startCoord;

window.addEventListener("mousedown" || "touchstart" , (event) => {
	startCoord = [event.clientX, event.clientY];
});
window.addEventListener("mouseup" || "touchend" , (event) => {
	const endCoord = [event.clientX, event.clientY];
	const diffX = endCoord[0] - startCoord[0];
	const diffY = endCoord[1] - startCoord[1];
	if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
		movecell("left");
	} else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
		movecell("right");
	} else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
		movecell("down");
	} else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
		movecell("up");
	}
});

// 새로하기 버튼
$gameBtn.addEventListener("click", function () {
	reset();
});

// 게임 초기화
function reset() {
	let arr = Array.from($gamebody.children);
	arr.forEach(function (i) {
		i.remove();
	});
	data = [];
  scorenum.textContent = 0;
  audio.pause();
	startGame();
}

// 콘솔
function cl(i){
  console.log(i);
}
