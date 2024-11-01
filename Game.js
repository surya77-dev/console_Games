const readline = require('readline');
const input = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

// Snake and Ladder Game
function snakeAndLadderGame(numPlayers) {
    const WINNING_POSITION = 100;

    let playerPositions = {};
    let diceRollCounts = {};

    for (let i = 1; i <= numPlayers; i++) {
        playerPositions[`player${i}Position`] = 0;
        diceRollCounts[`player${i}Rolls`] = 0;
    }

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function getOption() {
        return Math.floor(Math.random() * 3);
    }

    function playTurn(player) {
        let dice = rollDice();
        let option = getOption();
        let currentPosition = playerPositions[`player${player}Position`];
        diceRollCounts[`player${player}Rolls`]++;

        console.log(`Player ${player} rolled a ${dice}`);

        switch (option) {
            case 0: // No Play
                console.log(`Player ${player} got No Play, stays at position ${currentPosition}`);
                break;
            case 1: // Ladder
                currentPosition += dice;
                console.log(`Player ${player} got Ladder, moves to position ${currentPosition}`);
                if (currentPosition > WINNING_POSITION) {
                    currentPosition -= dice;
                }
                if (currentPosition === WINNING_POSITION) {
                    return true;
                }
                return playTurn(player); // Play again
            case 2: // Snake
                currentPosition -= dice;
                if (currentPosition < 0) currentPosition = 0;
                console.log(`Player ${player} got Snake, moves back to position ${currentPosition}`);
                break;
        }

        playerPositions[`player${player}Position`] = currentPosition;

        return false;
    }

    let gameWon = false;
    let currentPlayer = 1;
    while (!gameWon) {
        console.log(`\nTurn: Player ${currentPlayer}`);
        gameWon = playTurn(currentPlayer);
        if (gameWon) {
            console.log(`\nPlayer ${currentPlayer} wins the game!`);
            console.log(`Player ${currentPlayer} rolled the dice ${diceRollCounts[`player${currentPlayer}Rolls`]} times.`);
        }
        currentPlayer = currentPlayer % numPlayers + 1; // Move to the next player
    }

    for (let i = 1; i <= numPlayers; i++) {
        console.log(`Player ${i} rolled the dice ${diceRollCounts[`player${i}Rolls`]} times.`);
    }
}

// Start the game with players 

input.question('Enter the number of players: ', (reply) => {
   
 let numPlayers = Number(reply); 
    
if (numPlayers > 0) {
        
let winner = snakeAndLadderGame(numPlayers);
        
console.log('The Winner is: Player ' + winner);
    } 
else {
        
console.log('Please enter a valid number of players.');
   
 }
   
 input.close();
});
