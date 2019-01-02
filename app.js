/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var glblScores, currPlayer, roundScore, gameState, prevDiceRoll, diceRoll, maxScore, diceRoll2;

function init(){
	glblScores = [0, 0];
	currPlayer = 0;
	roundScore = 0;
	gameState = true;
	diceRoll = 0;
	diceRoll2 = 0;
	maxScore = 30;
	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

init();

function togglePlayer(){
	currPlayer === 0 ? currPlayer = 1 : currPlayer = 0;
}

function nextPlayer(){
	document.querySelector('#current-' + currPlayer).textContent = 0;
	roundScore = 0;
	diceRoll = 0;
	diceRoll2 = 0;
	togglePlayer();
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.getElementById('dice-0').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';
}

function rollDiceButtonAction(){
	if(gameState){
		prevDiceRoll = diceRoll;
		diceRoll = Math.floor(Math.random() * 6) + 1;
		diceRoll2 = Math.floor(Math.random() * 6) + 1;
		console.log(prevDiceRoll, diceRoll);
		document.getElementById('dice-0').style.display = 'block';
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-0').src = 'dice-' + diceRoll + '.png';
		document.getElementById('dice-1').src = 'dice-' + diceRoll2 + '.png';

		// if(prevDiceRoll === 6 && diceRoll === 6) {
		// 	glblScores[currPlayer] = 0;
		// 	document.getElementById('score-' + currPlayer).textContent = '0';
		// 	nextPlayer();
		// } else 

		if(diceRoll !== 1 && diceRoll2 != 1){
			roundScore += (diceRoll + diceRoll2);
			document.querySelector('#current-' + currPlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
}

document.querySelector('.btn-roll').addEventListener('click', rollDiceButtonAction);

function holdButtonAction() {
	if(gameState){
		console.log(maxScore);
		glblScores[currPlayer] += roundScore;
		document.querySelector('#score-' + currPlayer).textContent = glblScores[currPlayer];
		if(glblScores[currPlayer] >= maxScore){
			document.querySelector('#name-' + currPlayer).textContent = 'Winner!';
			document.getElementById('dice-0').style.display = 'none';
			document.getElementById('dice-1').style.display = 'none';
			document.querySelector('.player-'+currPlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+currPlayer+'-panel').classList.remove('active');
			gameState = false;
		}
		else
			nextPlayer();
	}
}

document.querySelector('.btn-hold').addEventListener('click', holdButtonAction);


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('#winScore').addEventListener('keyup', function(event){
	event.preventDefault();
  	if (event.keyCode === 13) {
    	maxScore = document.getElementById('winScore').value;
  }
});