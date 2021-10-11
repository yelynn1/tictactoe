let play_board = ["", "", "", "", "", "", "", "", ""];
const player = "O";
const computer = "X";
let board_full = false;
let ai_level = "";

// Array cells
const player_win = document.getElementById("player_win");
const computer_win = document.getElementById("computer_win");
const player_loss = document.getElementById("player_loss");
const computer_loss = document.getElementById("computer_loss");
const player_draw = document.getElementById("player_draw");
const computer_draw = document.getElementById("computer_draw");

const winner_statement = document.getElementById("winner");
const audio = document.querySelector("audio");

const render_board = () => {
    const board_container = document.querySelector(".play-area");
    board_container.innerHTML = "";
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
        if (e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

const configure_ai = () => {
    let ai_select = document.querySelector("#ai_level");
    ai_level = Array.from(ai_select.options).filter(option => option.defaultSelected == true)[0].value;
    ai_select.addEventListener("change", event => {
        ai_level = event.target.options[event.target.selectedIndex].value;
    });
}

FBInstant.initializeAsync()
    .then(function() {
        var progress = 0;
        var interval = setInterval(function() {
            if (progress >= 95) {
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
    });

render_board();
configure_ai();

//setTimeout(render_board(), 3000);

const checkBoardComplete = () => {
    let flag = true;
    play_board.forEach(element => {
        if (element == "") {
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
    if (play_board.every(item => item === "")) {
        // const PLAYER = 0;
        const COMPUTER = 1;
        const start = Math.round(Math.random());
        if (start === COMPUTER) {
            addComputerMove(ai_level);
            console.log("COMPUTER STARTED")
        } else {
            console.log("PLAYER STARTS")
        }
    }
}
const addPlayerMove = e => {
    if (play_board[e] == "" && !board_full) {
        document.querySelector("#ai_level").disabled = true;
        play_board[e] = player;
        game_loop();
        addComputerMove(ai_level);
    }
};

const addComputerMove = (ai_level) => {
    if (!board_full) {
        let score;
        let compare;
        switch (ai_level) {
            case "hard":
                score = -Infinity;
                compare = (a, b) => a > b;
                break;
            case "easy":
                score = Infinity;
                compare = (a, b) => a < b;
                break;
            case "normal":
                let guess = Math.random() * 100;
                if (guess <= 40) {
                    score = Infinity;
                    compare = (a, b) => a < b;
                } else {
                    score = -Infinity;
                    compare = (a, b) => a > b;
                }
                break;
        }
        let nextMove;
        for (let i = 0; i < play_board.length; i++) {
            if (play_board[i] == "") {
                play_board[i] = computer;
                let endScore = minimax(play_board, 0, false);
                play_board[i] = "";
                if (compare(endScore, score)) {
                    score = endScore;
                    nextMove = i;
                }
            }
        }
        play_board[nextMove] = computer;
        game_loop();
    }
}

let scores = { X: 1, O: -1, tie: 0 };

const minimax = (board, isMaximizing) => {
    let res = check_match();
    if (res != "") {
        return scores[res];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                board[i] = computer;
                let score = minimax(board, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                board[i] = player;
                let score = minimax(board, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

const checkWinner = () => {

    // Determine if there is a winner
    let res = check_match();

    let winnerMsg = '';
    let winnerClass = '';
    let audioName = '';

    if (res == player) {

        winnerMsg = "Player Won";
        winnerClass = "playerWin";
        audioName = "audio/win.wav";

        board_full = true;

        player_win.innerText = parseInt(player_win.innerText) + 1;
        computer_loss.innerText = parseInt(computer_loss.innerText) + 1;

    } else if (res == computer) {

        winnerMsg = "Computer Won";
        winnerClass = "computerWin";
        audioName = "audio/gameover.wav";

        board_full = true;

        computer_win.innerText = parseInt(computer_win.innerText) + 1;
        player_loss.innerText = parseInt(player_loss.innerText) + 1;

    } else if (board_full) {

        winnerMsg = "Draw...";
        winnerClass = "draw";
        audioName = "audio/gameover.wav";

        player_draw.innerText = parseInt(player_draw.innerText) + 1;
        computer_draw.innerText = parseInt(player_draw.innerText) + 1;

    }

    // Update winner message
    winner_statement.innerText = winnerMsg;
    winnerClass != '' ? winner_statement.classList.add(winnerClass) : winner_statement.className = '';

    // Run audio
    audio.pause();
    var draw = new Audio(audioName);
    draw.play();

};

function resetScoreboard() {
    player_win.innerText = 0;
    computer_win.innerText = 0;

    player_loss.innerText = 0;
    computer_loss.innerText = 0;

    player_draw.innerText = 0;
    computer_draw.innerText = 0;

    winner_statement.className = '';
    winner_statement.innerText = '';
}

const check_line = (a, b, c) => {
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
    for (let i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            return play_board[i];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return play_board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        return play_board[0];
    }
    if (check_line(2, 4, 6)) {
        return play_board[2];
    }
    checkBoardComplete();
    if (board_full) return "tie";
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
    document.querySelector("#ai_level").disabled = false;
    const audio = document.querySelector("audio");
    render_board();
    randomizeStart();
}

//document.getElementsByClassName("player_win").innerText = player_win;
//document.getElementsByClassName("computerstat").innerText = computer_win;

//randomizeStart();

// window.addEventListener("DOMContentLoaded", event => {
//     const audio = document.querySelector("audio");
//     audio.volume = 0.2;
//     audio.play();
// });

// const checkbox = document.getElementById('checkbox');

// container-custom.addEventListener('onclick', () => {
//     // change the theme of the website
//     document.body.classList.toggle('dark');
// });


/*var button = document.getElementById("checkbox");

button.addEventListener("click", function() {
    const curColour = document.body.style.backgroundColor;

    if (curColour === 'white') {
        document.body.style.backgroundColor = "darkgray";
    }
    else {
        document.body.style.backgroundColor = "white";
    }
});
*/