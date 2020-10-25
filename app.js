let play_board = ["", "", "", "", "", "", "", "", ""];
const player = "O";
const computer = "X";
var playerstat = 0;
var computerstat = 0;
var drawstat = 0;
let board_full = false;


const render_board = () => {
    const board_container = document.querySelector(".play-area");
    board_container.innerHTML = "";
    document.getElementById("playerstat").innerText=playerstat;
    document.getElementById("computerstat").innerText=computerstat;
    document.getElementById("drawstat").innerText=drawstat;
    play_board.forEach((e,i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
        if(e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

FBInstant.initializeAsync()
  .then(function(){
        var progress = 0;
        var interval = setInterval(function() {
            if(progress>=95){
                clearInterval(interval);
                FBInstant.startGameAsync().then(
                    function() {
                        console.log("Game Loaded");
                    }
                )
            };
            FBInstant.setLoadingProgress(progress);
            progress += 5;
        }, 100);
  }
);

render_board();
//setTimeout(render_board(), 3000);



const checkBoardComplete = () => {
    let flag = true;
    play_board.forEach(element => {
        if(element == "") {
            flag = false;
        }
    });
    board_full = flag;
};

const game_loop = () => {
    render_board();
    checkBoardComplete();
    checkWinner();
}

const randomizeStart = () => {
    if(play_board.every(item=> item==="")){
    // const PLAYER = 0;
    const COMPUTER = 1;
    const start = Math.round(Math.random());
    if(start === COMPUTER){
            addComputerMove();
            console.log("COMPUTER STARTED")
    }else{
        console.log("PLAYER STARTS")
    }}
}
const addPlayerMove = e => {
    if (play_board[e] == "" && !board_full) {
        play_board[e] = player;
        game_loop();
        addComputerMove();
    }
};

const addComputerMove = () => {
    if(!board_full){
        let bestScore = -Infinity;
        let bestMove;
        for(let i = 0; i < play_board.length; i++){
            if(play_board[i] == ""){
                play_board[i] = computer;
                let score = minimax(play_board,0, false);
                play_board[i] = "";
                if(score > bestScore){
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        play_board[bestMove] = computer;
        game_loop();
    }
}

let scores = {X : 1, O : -1, tie : 0};

const minimax = (board, depth, isMaximizing) => {
    let res = check_match();
    if(res != ""){
        return scores[res];
    }
    if(isMaximizing){
        let bestScore = -Infinity;
        for(let i = 0;i<board.length;i++){
            if(board[i] == ""){
                board[i] = computer;
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score,bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for(let i = 0;i<board.length;i++){
            if(board[i] == ""){
                board[i] = player;
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score,bestScore);
            }
        }
        return bestScore;
    }
}

const checkWinner = () => {
    let res = check_match();
    const winner_statement = document.getElementById("winner");
    if (res == player) {
        winner_statement.innerText = "Player Won";
        winner_statement.classList.add("playerWin");
        board_full = true;
        playerstat++;
        console.log("player win");
    }
    else if (res == computer) {
        winner_statement.innerText = "Computer Won";
        winner_statement.classList.add("computerWin");
        board_full = true;
        computerstat++;
        console.log("computer win");
    }
    else if (board_full) {
        winner_statement.innerText = "Draw...";
        winner_statement.classList.add("draw");
        drawstat++;
        console.log("draw");
    }
};

const check_line = (a,b,c) => {
    let status =
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a] == player || play_board[a] == computer);
    if (status) {
        document.getElementById(`block_${a}`).classList.add("won");
        document.getElementById(`block_${b}`).classList.add("won");
        document.getElementById(`block_${c}`).classList.add("won");
    }
    return status;
};

const check_match = () => {
    for (let i=0; i<9; i+=3) {
        if(check_line(i,i+1,i+2)) {
            return play_board[i];
        }
    }
    for (let i=0; i<3; i++) {
        if(check_line(i, i+3, i+6)) {
            return play_board[i];
        }
    }
    if(check_line(0,4,8)) {
        return play_board[0];
    }
    if(check_line(2,4,6)) {
        return play_board[2];
    }
    checkBoardComplete();
    if(board_full) return "tie";
    return "";
}

const reset_board = () => {
    const winner_statement = document.getElementById("winner");
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner_statement.classList.remove("playerWin");
    winner_statement.classList.remove("computerWin");
    winner_statement.classList.remove("draw");
    winner_statement.innerText = "";
    render_board();
    randomizeStart();
}
randomizeStart();
