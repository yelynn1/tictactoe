document.addEventListener("DOMContentLoaded", () => {
  let play_board = ["", "", "", "", "", "", "", "", ""];
  let player_symbol = "X"; // The human player is always X
  let computer_symbol = "O"; // The computer is always O
  let currentPlayer = "X"; // Track whose turn it is
  let gameMode = 1; // 1: Single Player, 2: Two Players
  let board_full = false;
  let lastMove = null;
  let scores = { player1: 0, player2: 0, draw: 0 };

  const board_container = document.querySelector(".play-area");
  const winner_statement = document.getElementById("winner");
  const ai_select = document.getElementById("ai_level");
  const instructionsPopup = document.getElementById("instructions-popup");
  const mainContent = document.querySelector(".main-content");
  const player1_label = document.getElementById("Player1");
  const player2_label = document.getElementById("Player2");
  const move_indicator = document.getElementById("move");
  const audioPlayer = document.getElementById("myAudio");

  const render_board = () => {
    board_container.innerHTML = "";
    play_board.forEach((value, i) => {
      const block = document.createElement("div");
      block.id = `block_${i}`;
      block.classList.add("block");
      block.textContent = value;
      if (value) {
        block.classList.add("occupied");
      }
      block.addEventListener("click", () => addPlayerMove(i));
      board_container.appendChild(block);
    });
  };

  const game_loop = () => {
    render_board();
    checkBoardComplete();
    checkWinner();
  };

  const checkBoardComplete = () => {
    board_full = play_board.every((element) => element !== "");
  };

  const addPlayerMove = (i) => {
    if (play_board[i] !== "" || board_full) {
      return; // Can't move here
    }

    ai_select.disabled = true;
    lastMove = [...play_board];
    play_board[i] = currentPlayer;

    if (gameMode === 1) {
      // Single Player
      game_loop();
      if (!board_full) {
        currentPlayer = computer_symbol;
        showPlayer();
        setTimeout(() => addComputerMove(), 500);
      }
    } else {
      // Two Players
      currentPlayer =
        currentPlayer === player_symbol ? computer_symbol : player_symbol;
      game_loop();
      showPlayer();
    }
  };

  const addComputerMove = () => {
    if (board_full) return;

    let bestMove = getBestMove();
    play_board[bestMove] = computer_symbol;
    currentPlayer = player_symbol;
    game_loop();
    showPlayer();
  };

  const getBestMove = () => {
    // AI logic here (minimax)
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (play_board[i] === "") {
        play_board[i] = computer_symbol;
        let score = minimax(play_board, 0, false);
        play_board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimaxScores = { [computer_symbol]: 1, [player_symbol]: -1, tie: 0 };
  const minimax = (board, depth, isMaximizing) => {
    let result = check_match();
    if (result !== null) {
      return minimaxScores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = computer_symbol;
          let score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = player_symbol;
          let score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const showPlayer = () => {
    if (board_full) return;
    if (gameMode === 1) {
      move_indicator.innerHTML =
        currentPlayer === player_symbol ? "Your Move!" : "Computer's Move...";
    } else {
      move_indicator.innerHTML = `Player ${
        currentPlayer === player_symbol ? 1 : 2
      }'s Move!`;
    }
  };

  const checkWinner = () => {
    let result = check_match();
    if (result === null) return;

    board_full = true;
    audioPlayer.pause();

    if (result === "tie") {
      winner_statement.innerText = "It's a Draw!";
      winner_statement.classList.add("draw");
      scores.draw++;
    } else {
      const winnerName =
        result === player_symbol
          ? gameMode === 1
            ? "Player"
            : "Player 1"
          : gameMode === 1
          ? "Computer"
          : "Player 2";

      winner_statement.innerText = `${winnerName} Won!`;
      winner_statement.classList.add(
        result === player_symbol ? "playerWin" : "computerWin"
      );

      if (result === player_symbol) scores.player1++;
      else scores.player2++;
    }
    updateScoreboard();
  };

  const check_match = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winConditions) {
      const [a, b, c] = combo;
      if (
        play_board[a] &&
        play_board[a] === play_board[b] &&
        play_board[a] === play_board[c]
      ) {
        return play_board[a];
      }
    }
    return play_board.includes("") ? null : "tie";
  };

  const updateScoreboard = () => {
    document.getElementById("playerstat1").innerText = scores.player1; // Player 1/Player Wins
    document.getElementById("computerstat1").innerText = scores.player2; // Player 2/Computer Wins
    document.getElementById("loss1").innerText = scores.player2; // Player 1/Player Losses
    document.getElementById("loss2").innerText = scores.player1; // Player 2/Computer Losses
    document.getElementById("draw1").innerText = scores.draw;
    document.getElementById("draw2").innerText = scores.draw;
  };

  const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    currentPlayer = player_symbol;

    winner_statement.innerText = "";
    winner_statement.className = "";
    ai_select.disabled = false;

    if (gameMode === 1 && currentPlayer === computer_symbol) {
      setTimeout(() => addComputerMove(), 500);
    }

    game_loop();
    showPlayer();
  };

  const selectFirstPlayer = (symbol) => {
    currentPlayer = symbol;
    reset_board();
  };

  const undoLastMove = () => {
    if (lastMove !== null) {
      play_board = [...lastMove];
      lastMove = null;
      board_full = false;
      winner_statement.innerText = "";
      winner_statement.className = "";
      // In a 2-player game, you might need to toggle the currentPlayer back.
      if (gameMode === 2) {
        currentPlayer =
          currentPlayer === player_symbol ? computer_symbol : player_symbol;
      }
      game_loop();
      showPlayer();
    }
  };

  mainContent.style.display = "none";

  document.getElementById("singlePlayerBtn").addEventListener("click", () => {
    instructionsPopup.style.display = "none";
    mainContent.style.display = "block";
    gameMode = 1;
    player1_label.innerText = "Player (X)";
    player2_label.innerText = "Computer (O)";
    reset_board();
  });

  document.getElementById("twoPlayerBtn").addEventListener("click", () => {
    instructionsPopup.style.display = "none";
    mainContent.style.display = "block";
    gameMode = 2;
    player1_label.innerText = "Player 1 (X)";
    player2_label.innerText = "Player 2 (O)";
    reset_board();
  });

  // Game Control Buttons
  document.getElementById("undoBtn").addEventListener("click", undoLastMove);
  document
    .getElementById("selectOBtn")
    .addEventListener("click", () => selectFirstPlayer(computer_symbol)); // O starts
  document
    .getElementById("selectXBtn")
    .addEventListener("click", () => selectFirstPlayer(player_symbol)); // X starts
  ai_select.addEventListener("change", (e) => (ai_level = e.target.value));

  // UI Control Buttons
  document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark-main");
    const btn = document.getElementById("darkModeBtn");
    btn.textContent = document.body.classList.contains("dark-main")
      ? "Light Mode"
      : "Dark Mode";
  });

  document.getElementById("playAudioBtn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    if (audioPlayer.paused) {
      audioPlayer.play();
      btn.innerHTML = '<i class="fa fa-pause"></i> Pause';
    } else {
      audioPlayer.pause();
      btn.innerHTML = '<i class="fa fa-music"></i> Play';
    }
  });

  document.getElementById("volume-slider").addEventListener("input", (e) => {
    audioPlayer.volume = e.currentTarget.value / 100;
  });

  document.getElementById("muteAudioBtn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    audioPlayer.muted = !audioPlayer.muted;
    btn.innerHTML = audioPlayer.muted
      ? `<i class="fa fa-volume-off"></i>`
      : `<i class="fa fa-volume-up"></i>`;
  });

  if (typeof FBInstant !== "undefined") {
    FBInstant.initializeAsync().then(() => {
      FBInstant.setLoadingProgress(100);
      FBInstant.startGameAsync();
    });
  }
});
