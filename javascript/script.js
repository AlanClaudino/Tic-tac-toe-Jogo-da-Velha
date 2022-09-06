// DOM Elements

const startGame = document.getElementById('start-game');
const mainContent = document.getElementById('main-content');
const newGame = document.getElementById('new-game');

const playBtn = document.getElementById('play-btn');
const newGameBtn = document.getElementById('new-game-btn');

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

// Events

playBtn.addEventListener('click', () => {
  fadeINOut(mainContent, startGame);
});

newGame.addEventListener('click', () => {
  fadeINOut(mainContent, newGame)
})




