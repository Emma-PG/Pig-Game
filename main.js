'use strict';

//elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const bttnNew = document.querySelector('.btn--new');
const bttnRoll = document.querySelector('.btn--roll');
const bttnHold = document.querySelector('.btn--hold');

//ini
const scores = [0, 0];
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
diceElement.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
//functions
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//events
bttnRoll.addEventListener('click', () => {
  //1 generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2 display dice
  diceElement.classList.remove('hidden');
  diceElement.src = `images/dice-${dice}.png`;
  //3 check for rolled 1 if true switch to nex player
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch player
    switchPlayer();
  }
});

bttnHold.addEventListener('click', () => {
  //add current score to invite player's score
  scores[activePlayer] += currentScore;
  // document.getElementById(`current--${activePlayer}`).textContent =
  //   scores[activePlayer];
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 50) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document.querySelector(
      `#name--${activePlayer}`
    ).textContent = `Player ${activePlayer} Wins!!`;
    bttnHold.classList.add('hidden');
    bttnRoll.classList.add('hidden');
  }
});

bttnNew.addEventListener('click', () => {
  window.location.reload();
});
