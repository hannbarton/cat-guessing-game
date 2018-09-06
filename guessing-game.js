//final images to be shown
const finalImage = {
    background: "url('https://piskel-imgstore-b.appspot.com/img/df936ab8-aee9-11e8-834f-574ce756a06c.gif')",
    lose: 'https://piskel-imgstore-b.appspot.com/img/634e5d57-b20b-11e8-b45a-8788d64d4327.gif',
    win: 'https://piskel-imgstore-b.appspot.com/img/9dead24f-b208-11e8-89b5-8788d64d4327.gif',
}

//generate random winning number between 1 - 100
function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

//this shuffles the arr in place
function shuffle(array) {
    let m = array.length;

    while (m) {
      let i = Math.floor(Math.random() * m--);
      let t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

//this is the Game class with all of the methods
class Game {
    constructor() {
        this.winningNumber = generateWinningNumber();
        this.playersGuess = null;
        this.pastGuesses = [];
        this.gotHint = false;
        this.gameOver = false;
        this.guessCount = 0;
    }
    difference() {
        return Math.abs(this.winningNumber - this.playersGuess)
    }
    isLower() {
        if (this.playersGuess > this.winningNumber) {
            return 'Guess lower!'
        }
        else if (this.playersGuess < this.winningNumber){
            return 'Guess higher!'
        }
        return 'Play again?'
    }
    playersGuessSubmission(guess) {
        if (this.gameOver) {
            return `Game Over! You have no more guesses left ;_;`
        }
        else if (!this.gameOver) {
            if (guess < 1 || guess > 100 || isNaN(guess)) {
                return `Please submit a valid number.`
            }
            else {
                this.playersGuess = parseInt(guess, 10);
                this.guessCount++;
                this.isLower()
                return this.checkGuess();
            }
        }
    }

    checkGuess() {
        if (this.pastGuesses.includes(this.playersGuess)) {
            this.guessCount -= 1;
            return 'You have already guessed that number.'
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            this.addGuess(this.playersGuess);

            if (this.playersGuess === this.winningNumber) {
                this.gameOver = true;
                document.getElementById('final-image').src = finalImage.win;
                document.getElementById('user-guess').parentNode.removeChild(document.getElementById('user-guess'));

                return 'You Win! This winning number was ' + this.winningNumber;
            }
            else if (this.pastGuesses.length >= 5) {
                this.gameOver = true;
                document.getElementById('final-image').src = finalImage.lose;
                document.getElementById('user-guess').parentNode.removeChild(document.getElementById('user-guess'));
                return 'You Lose! The winning number was ' + this.winningNumber;
            }
            else if (this.difference() < 10) {
                return `You are burning up! `
            }
            else if (this.difference() < 25) {
                return `You are lukewarm. `
            }
            else if (this.difference() < 50) {
                return `You're a bit chilly. `
            }
            else if (this.difference() < 100) {
                return `You're ice cold! `
            }
        }
    }
    provideHint() {
        let hintArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]

        if (this.gotHint === false) {
            
            this.gotHint = true;
            shuffle(hintArr);
            return `One of the numbers is: ${hintArr[0]}, or ${hintArr[1]}, or ${hintArr[2]}`
        }
        else if (this.gotHint === true) {
            return `You have already been given your hint!`
        }
    }
    addGuess(num) {
        if (this.guessCount === 1) {
            document.getElementById('guess1').innerHTML = num;
            document.getElementById('guess1').style.backgroundImage = finalImage.background;
        }
        if (this.guessCount === 2) {
            document.getElementById('guess2').innerHTML = num;
            document.getElementById('guess2').style.backgroundImage = finalImage.background;
        }
        if (this.guessCount === 3) {
            document.getElementById('guess3').innerHTML = num;
            document.getElementById('guess3').style.backgroundImage = finalImage.background;
        }
        if (this.guessCount === 4) {
            document.getElementById('guess4').innerHTML = num;
            document.getElementById('guess4').style.backgroundImage = finalImage.background;
        }
        else if (this.guessCount === 5) {
            document.getElementById('guess5').innerHTML = num;
            document.getElementById('guess5').style.backgroundImage = finalImage.background;
        }
    }
}

// function resetStyle() {
//     let elem = document.getElementById('input');
//     elem.style.display = 'inline';
// }

function newGame() {
    return new Game()
}

let game = newGame();

window.onload = function() {

    //Submit
    document.getElementById('submit').addEventListener('click', function() {

        let userSubmit = parseInt(document.getElementById('user-guess').value, 10);

        document.querySelector('h3').innerHTML = game.playersGuessSubmission(userSubmit)
        document.querySelector('h2').innerHTML = game.isLower(userSubmit);
        document.getElementById('user-guess').value = ''
    });

    //Hint
    document.getElementById('hint').addEventListener('click', function() {
        document.querySelector('h3').innerHTML = game.provideHint();
    });
    
    //Reset
    document.getElementById('reset').addEventListener('click', function() {
        game = newGame();
        window.location.reload();

        // document.getElementById('guess1').innerHTML = '-';
        // document.getElementById('guess2').innerHTML = '-';
        // document.getElementById('guess3').innerHTML = '-';
        // document.getElementById('guess4').innerHTML = '-';
        // document.getElementById('guess5').innerHTML = '-';

        // document.getElementById('guess1').style.backgroundImage = '';
        // document.getElementById('guess2').style.backgroundImage = '';
        // document.getElementById('guess3').style.backgroundImage = '';
        // document.getElementById('guess4').style.backgroundImage = '';
        // document.getElementById('guess5').style.backgroundImage = '';

        // document.querySelector('h3').innerHTML = 'This game has been reset';
        // document.querySelector('user-guess').innerHTML = 'TEXT HERE';

        // //take out final ending game image
        // document.getElementById('final-image').src = '';

        // // resetStyle();
        // document.getElementsByClassName('input').style.display = 'block';
        // document.getElementById('user-guess').style.display = 'block';
    });
};

