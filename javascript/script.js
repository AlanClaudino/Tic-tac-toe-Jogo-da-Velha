// DOM Elements

const startGame = document.getElementById('start-game');
const gameBoard = document.querySelector('.game-container');
const newGame = document.getElementById('new-game');
const boardSpace = document.querySelectorAll('.board-space');
const playerX = document.getElementById('player-x');
const playerO = document.getElementById('player-o');
const winnerMessage = document.getElementById('winner-message');

const playBtn = document.getElementById('play-btn');
const newGameBtn = document.getElementById('new-game-btn');
const backBtn = document.querySelectorAll('.back-btn');


let playerControl;
let gameControl;
let roundCounter;


// Functions

function fadeINOut(fadeIn, fadeOut) {
  fadeOut.classList.add('fade-out');
  fadeOut.addEventListener('animationend', () => {
    fadeOut.style.display = 'none';
    fadeIn.style.display = 'flex';
  }, {once: true});
  fadeIn.classList.add('fade-in');
  fadeIn.addEventListener('animationend', () => {
    fadeOut.classList.remove('fade-out');
    fadeIn.classList.remove('fade-in');  
  }, {once: true});
}

function updatePlayer() {
  if(playerControl === 1) {
    playerControl = 2;
    playerX.classList.remove('underline');
    playerO.classList.add('underline');
  } else {
    playerControl = 1;
    playerO.classList.remove('underline');
    playerX.classList.add('underline');
    roundCounter += 1;
  }
}

function write(boardSpace) {
  if (boardSpace.innerText != "") return;
  if (playerControl === 1) {
    boardSpace.innerText = "X"    
  } else {
    boardSpace.innerText = "O";
    boardSpace.classList.add('player-o-style')
  }
}

function updateGameControl(boardSpaceId) {
  let line = Math.trunc(boardSpaceId / 3);
  let column = Math.trunc(boardSpaceId % 3);
  console.log (line, column)
  if (playerControl === 1) {
    gameControl[line][column] = "x";
  } else {
    gameControl[line][column] = "o";
  }
}

function winnerCheck(boardSpaceId) {
  let line = Math.trunc(boardSpaceId / 3);
  let column = Math.trunc(boardSpaceId % 3);
  if (playerControl === 1) {
    if (gameControl[line][0] === gameControl[line][1] && gameControl[line][1] === gameControl[line][2]) {
      winnerMessage.innerText = "Player X won!";
      fadeINOut (newGame, gameBoard);
    } else if (gameControl[0][column] === gameControl[1][column] && gameControl[1][column] === gameControl[2][column]) {
      winnerMessage.innerText = "Player X won!";
      fadeINOut (newGame, gameBoard);
    } else if (gameControl[0][0] === "x" && gameControl[1][1] === "x" && gameControl[2][2] === "x") {
      winnerMessage.innerText = "Player X won!";
      fadeINOut (newGame, gameBoard);
    } else if (gameControl[0][2] === "x" && gameControl[1][1] === "x" && gameControl[2][0] === "x") {
      winnerMessage.innerText = "Player X won!";
      fadeINOut (newGame, gameBoard);
    } else if(roundCounter === 5) {
      winnerMessage.innerText = "Draw";
      fadeINOut (newGame, gameBoard);
    } else {
      return;
    }
  } else if (playerControl === 2) {
    if (gameControl[line][0] === gameControl[line][1] && gameControl[line][1] === gameControl[line][2]) {
      winnerMessage.innerText = "Player O won!";
      fadeINOut (newGame, gameBoard);
    } else if (gameControl[0][column] === gameControl[1][column] && gameControl[1][column] === gameControl[2][column]) {
      winnerMessage.innerText = "Player O won!";
      fadeINOut (newGame, gameBoard);
    } else if (gameControl[0][0] === "o" && gameControl[1][1] === "o" && gameControl[2][2] === "o") {
      winnerMessage.innerText = "Player O won!";
      fadeINOut (newGame, gameBoard);
    } else if (gameControl[0][2] === "o" && gameControl[1][1] === "o" && gameControl[2][0] === "o") {
      winnerMessage.innerText = "Player O won!";
      fadeINOut (newGame, gameBoard);
    } else {
      return
    }
  }
}

function controlReload() {
  playerControl = 1
  gameControl = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
  roundCounter = 1;
  boardSpace.forEach((key) => {
    key.innerText = "";
    key.classList.remove('player-o-style')
  });
  playerO.classList.remove('underline');
  playerX.classList.add('underline');
}

function backFirstScreen() {
  fadeINOut()
}

// Events

playBtn.addEventListener('click', () => {
  controlReload();
  fadeINOut(gameBoard, startGame);
});

newGameBtn.addEventListener('click', () => {
  fadeINOut(gameBoard, newGame)
  controlReload();
})

backBtn.forEach((key) => {
  key.addEventListener('click', () => {
    if(key.id === 'back-game-section') {
      fadeINOut(startGame, gameBoard);
    } else if (key.id === 'back-new-game') {
      fadeINOut(startGame, newGame);
    }
  })
})

boardSpace.forEach( (key) => {
  key.addEventListener('click', () => {
    let keyId = parseInt(key.id)
    write(key);
    updateGameControl(keyId);
    winnerCheck(keyId)
    updatePlayer();
  })
})


