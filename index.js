'use strict';

const $gameBtn = document.getElementById('gameBtn');
const $score = document.getElementById('score');
const $bestscore = document.getElementById('bestscore');
const $gamebody = document.getElementById('gamebody');
let data = [];
let scorenum = $score.querySelector('.scorenum');
let bestscore = $bestscore.querySelector('.bestnum');

// $table -> $fragment -> $tr -> $td
// 게임시작
function startGame() {
    const $fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
        const rowData = [];
        data.push(rowData);
        const $tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(() => {
            rowData.push(0);
            const $td = document.createElement('td');
            $tr.appendChild($td);
        });
        $fragment.appendChild($tr);
    });
    $gamebody.appendChild($fragment);
    putcell();
    draw();
}
// 랜덤숫지
function putcell(){
    const emptycell = [];
    data.forEach(function(rowdata, i){
        rowdata.forEach(function(celldata, j){
            if(!celldata){
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
            const $target = $gamebody.children[i].children[j];
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

startGame();

data = [
    [8,2,2,4],
    [4,4,2,4],
    [2,1024,1024,8],
    [8,2,8,16],
]
draw();


// 움직이게
function movecell(direction){
    switch(direction){
        case 'left': {
            const newdata = [[],[],[],[]];
            data.forEach((rowData, i) => {
                rowData.forEach((celldata, j) => {
                    if(celldata){
                        const currentRow = newdata[i];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === celldata){// 이전 값과 지금 값이 같으면
                            let score = parseInt(scorenum.textContent);
                            scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
                            currentRow[currentRow.length - 1] *= -2;
                        } else {
                            newdata[i].push(celldata);
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach((rowdata, i) => {
                [1,2,3,4].forEach((celldata, j) => {
                    data[i][j] = Math.abs(newdata[i][j]) || 0;
                });
            });
            break;
        }

        case 'right': {
            const newdata = [[],[],[],[]];
            data.forEach((rowData, i) => {
                rowData.forEach((celldata, j) => {
                    if(rowData[3 - j]){
                        const currentRow = newdata[i];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === rowData[3 - j]){// 이전 값과 지금 값이 같으면
                            let score = parseInt(scorenum.textContent);
                            scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
                            currentRow[currentRow.length - 1] *= -2;
                        } else {
                            newdata[i].push(rowData[3 - j]);
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach((rowdata, i) => {
                [1,2,3,4].forEach((celldata, j) => {
                    data[i][3 - j] = Math.abs(newdata[i][j]) || 0;
                });
            });
            break;
        }

        case 'up': {
            const newdata = [[],[],[],[]];
            data.forEach((rowData, i) => {
                rowData.forEach((celldata, j) => {
                    if(celldata){
                        const currentRow = newdata[j];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === celldata){// 이전 값과 지금 값이 같으면
                            let score = parseInt(scorenum.textContent);
                            scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
                            currentRow[currentRow.length - 1] *= -2;
                        } else {
                            newdata[j].push(celldata);
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach((rowdata, i) => {
                [1,2,3,4].forEach((celldata, j) => {
                    data[j][i] = Math.abs(newdata[i][j]) || 0;
                });
            });
            break;
        }

        case 'down': {
            const newdata = [[],[],[],[]];
            data.forEach((rowData, i) => {
                rowData.forEach((celldata, j) => {
                    if(data[3 - i][j]){
                        const currentRow = newdata[j];
                        const prevData = currentRow[currentRow.length - 1];
                        if(prevData === data[3 - i][j]){// 이전 값과 지금 값이 같으면
                            let score = parseInt(scorenum.textContent);
                            scorenum.textContent = score + currentRow[currentRow.length - 1] * 2;
                            currentRow[currentRow.length - 1] *= -2;
                        } else {
                            newdata[j].push(data[3 - i][j]);
                        }
                    }
                });
            });
            console.log(newdata);
            [1,2,3,4].forEach((rowdata, i) => {
                [1,2,3,4].forEach((celldata, j) => {
                    data[3 - j][i] = Math.abs(newdata[i][j]) || 0;
                });
            });
            break;
        }
        

    }
    if(data.flat().includes(2048)){
        draw();
        setTimeout(() => {
            alert('축하합니다 2048을 만드셨어요!');
            let final = localStorage.setItem('best',scorenum.textContent);
            bestscore.textContent = localStorage.getItem('best');
        },50);
    } else if(!data.flat().includes(0)){
        alert(`여기까지~ 점수는 ${scorenum.textContent}점`);
        let final = localStorage.setItem('best',scorenum.textContent);
        bestscore.textContent = localStorage.getItem('best');
    }

    putcell();
    draw();
    
}

window.addEventListener('keyup',(e) => {
    if(e.key === 'ArrowUp'){
        movecell('up');
    } else if(e.key === 'ArrowDown'){
        movecell('down');
    } else if(e.key === 'ArrowLeft'){
        movecell('left');
    } else if(e.key === 'ArrowRight'){
        movecell('right');
    }
});

let startmouse;
window.addEventListener('mousedown', (e) => {
    startmouse = [e.offsetX, e.offsetY];
});

window.addEventListener('mouseup', (e) => {
    const endmouse = [e.offsetX, e.offsetY];
    const diffX = endmouse[0] = startmouse[0];
    const diffY = endmouse[1] = startmouse[1];
    if(diffX < 0 && Math.abs(diffX) > Math.abs(diffY)){
        movecell('left');
    } else if(diffX > 0 && Math.abs(diffX) > Math.abs(diffY)){
        movecell('right');
    } else if(diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)){
        movecell('down');
    } else if(diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)){
        movecell('up');
    }

});
