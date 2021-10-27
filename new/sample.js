"use strict";

import $position from "./new.js";
const $realgame = document.getElementById("real");
const $gameBtn = document.getElementById("gameBtn");
const $score = document.getElementById("score");
const $bestscore = document.getElementById("bestscore");
let scorenum = $score.querySelector(".scorenum");
let bestscore = $bestscore.querySelector(".bestnum");
let data = [];
let audio = new Audio();

// BestScore 없으면 0 있으면 로컬스토리지에서 가져오기
bestscore.textContent = localStorage.getItem("best") || 0;

// 콘솔
function cl(i) {
  console.log(i);
}

// 게임시작 데이터 2중배열로 감싸기
function startGame() {
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
    });
  });
  [1,2].forEach(() => {
    putcell();// 랜덤 숫자위치 넣기
    draw();// 데이터위에 그리기
  });
}

// 랜덤숫자 위치
function putcell() {
  const emptycell = [];// 임시 랜덤저장소
  data.forEach(function (rowdata, i) {
    rowdata.forEach(function (celldata, j) {
      if (!celldata) {
        emptycell.push([i, j]);// 모든 위치값 저장
      }
    });
  });
  const randomCell = emptycell[Math.floor(Math.random() * emptycell.length)];//랜덤한 위치를 뽑아서 변수할당
  
  if(data.flat().includes(0)){// data를 펴봤을 때 0있으면
    data[randomCell[0]][randomCell[1]] = 2;// 랜덤한 data위치에 값 2할당
  }
}

// 그려넣기
function draw() {
  data.forEach((rowdata, i) => {
    rowdata.forEach((celldata, j) => {
      if (celldata > 0) {// 데이터 값이 0이상인 애들만 추려내기
        let $target = creatediv($position[i][j]);// div만들어 $position[i][j] 클래스넣기
        $target.textContent = celldata;// 데이터값 div에 나타내기
				$target.setAttribute('data-num',celldata);// 숫자 색깔 넣기
      }
    });
  });
}

// div만들고 위치 넣기
function creatediv(position) {
  const $fragment = document.createDocumentFragment();// 웹성능 최적화를 위해
  const $div = document.createElement("div");
  $div.classList.add(position);
  if(!$realgame.querySelector(`.${position}`)){// 받은 위치 값이 게임판 안에 있는지 없는지 구별
    $div.classList.add('newbox');// 새로운 박스 나오는 애니메이션
    $fragment.appendChild($div);// 자주 출력이 바뀔 때 부담을 덜어주기위해 fragment에 넣는다
    $realgame.appendChild($fragment);// 그후 fragment를 게임 판에 넣는다
  }
  return $div;// 함수의 값
}

startGame();
// data = [ // 더미데이터
//   [0, 2, 0, 2],
//   [0, 2, 0, 2],
//   [0, 0, 0, 0],
//   [0, 0, 0, 2],
// ];
// draw();

// 움직이게
function movecell(direction) {
  let effect = new Audio('mp3/movesound.mp3');
  switch (direction) {
    case "left": {
      const newdata = [[], [], [], []];// 위치를 당기기 위해 임시 데이터
      const num = [];// 점수 애니메이션 저장을 위해
      let prevpos = [[], [], [], []];// 이전 위치 저장소
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (celldata) {// 데이터가 있는지 없는지 구별
            const currentRow = newdata[i];// 현재 값
            const prevData = currentRow[currentRow.length - 1];// 이전 값
            if (prevData === celldata) {
              // 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);// string을 정수로 변환해서 변수로만들기
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;// 변환한 정수에 데이터값에 2배 곱해서 점수 합산하여 스코어 넣기

              $realgame.querySelector(`.${$position[i][j]}`).remove();// 기존 위치에 있는 박스 지우기
              currentRow[currentRow.length - 1] *= -2;// 현재 값에 2배를 곱함 -인 이유는 일자선상에 있을 때 오류 때문에 임의로
              num.push(currentRow[currentRow.length - 1]/-2);
            } else {
              newdata[i].push(celldata);// 데이터 값이 같지 않으면 넣기
              prevpos[i].push($position[i][j]);// 이전 위치 값 넣기
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

      newdata.forEach((row, i) => {
        row.forEach((cell, j) => {
          if(cell){// 데이터 여부 판별
            $realgame.querySelector(`.${prevpos[i][j]}`).className = $position[i][j];// 위치 당기기
          }
        });
      });

      [1, 2, 3, 4].forEach((rowdata, i) => {
        [1, 2, 3, 4].forEach((celldata, j) => {
          data[i][j] = Math.abs(newdata[i][j]) || 0;// 마이너스였던 데이터 정수로 바꿔서 넣기
          if(data[i][j] > 0){
            $realgame.querySelector(`.${$position[i][j]}`).textContent = data[i][j];// 현재 위치의 데이터값 출력
            $realgame.querySelector(`.${$position[i][j]}`).setAttribute('data-num',data[i][j]);// 현재 위치의 데이터값 색깔
            
          }
        });
      });
      effect.play();
      break;
    }
    case "right": {
      const newdata = [[], [], [], []];
      const num = [];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (rowData[3 - j]) {
            const currentRow = newdata[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === rowData[3 - j]) {
              // 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;

              $realgame.querySelector(`.${$position[i][3 - j]}`).remove();// 기존 위치에 있는 박스 지우기
              currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
            } else {
              newdata[i].push(rowData[3 - j]);
              prevpos[i].push($position[i][3 - j]);
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
      effect.play();
      break;
    }
    case "up": {
      const newdata = [[], [], [], []];
      const num = [];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (celldata) {
						const currentRow = newdata[j];
						const prevData = currentRow[currentRow.length - 1];
            if (prevData === celldata) {
              // 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;

              $realgame.querySelector(`.${$position[i][j]}`).remove();// 기존 위치에 있는 박스 지우기
              currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
            } else {
							newdata[j].push(celldata);
              prevpos[j].push($position[i][j]);
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
      effect.play();
      break;
    }
    case "down": {
      const newdata = [[], [], [], []];
      const num = [];
      let prevpos = [[], [], [], []];;
      data.forEach((rowData, i) => {
        rowData.forEach((celldata, j) => {
          if (data[3 - i][j]) {
						const currentRow = newdata[j];
						const prevData = currentRow[currentRow.length - 1];
            if (prevData === data[3 - i][j]) {
              // 이전 값과 지금 값이 같으면
							let score = parseInt(scorenum.textContent);
							scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;

              $realgame.querySelector(`.${$position[3 - i][j]}`).remove();// 기존 위치에 있는 박스 지우기
              currentRow[currentRow.length - 1] *= -2;
              num.push(currentRow[currentRow.length - 1]/-2);
            } else {
							newdata[j].push(data[3 - i][j]);
              prevpos[j].push($position[3 - i][j]);
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
      effect.play();
      break;
    }
  }
  putcell();
  draw();

  // 승패여부 확인
	if (data.flat().includes(2048)) {// 데이터안에 2048있을시
    audio.src = 'mp3/victoty.mp3';
    audio.load();
    audio.play();
    // 블럭이 나오기전에 alert가 먼저 들어가서 셋타임 걸음
		setTimeout(() => {
			alert("축하합니다 2048을 만드셨어요!");
			local(scorenum.textContent);
      reset();
		}, 300);
	} else if (defeatCheck()===true){// 데이터안에 0이 없을시
    audio.src = 'mp3/lose.mp3';
    audio.load();
    audio.play();
		setTimeout(() => {
      alert(`여기까지~ 점수는 ${scorenum.textContent}점`);
			local(scorenum.textContent);
      reset();
		}, 300);
	}
}

// 패배구별
function defeatCheck(){
  let checkDefeatFlag = true;  
  data.forEach((rowData,i)=>{
      if(rowData.includes(0)){
        checkDefeatFlag = false;// 가로값에 0이 있으면 넘어가고
      }
      //가로 체크~~
      for(let j=0;j<rowData.length;j++){
        if(rowData[j] === rowData[j+1]){
          checkDefeatFlag = false;// 양옆에 같은 숫자가 있어도 넘어가고
        }
        //세로 체크\
        if(data[j][i] === data[j+1]?.[i]){// 위아래 같아도 넘어가고
          checkDefeatFlag = false;
        }
      }
    })
    return checkDefeatFlag;
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
	}, 700);// 애니메이션 후에 지우기
}

// 최고 점수
function local(best) {
	let $bestscore = Number(localStorage.getItem("best"));// 로컬스토리지에서 저장값가져와서 변수할당
	if ($bestscore == null) {// 할당값이 없으면
		$bestscore = best;// 새로 점수 넣기
	} else if ($bestscore < best) {// 새로운 점수가 기존 점수보다 높은지 낮은지
		$bestscore = best;// 높으면 다시 넣어주기
	} else {
		$bestscore;// 높지 않으면 기존 값 유지
	}

	localStorage.setItem("best", $bestscore);// 로컬 스토리지에 점수 할당
	bestscore.textContent = $bestscore;// BestScore 표시
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

// 새로하기 버튼
$gameBtn.addEventListener("click", function () {
	reset();
});

// 게임 초기화
function reset() {
	let arr = Array.from($realgame.children);
	arr.forEach(function (i) {
		i.remove();
	});
  scorenum.textContent = 0;
  audio.pause();
	data = [];
	startGame();
}
