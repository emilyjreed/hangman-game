//Set variables
var wordBank = [
    "targaryen",
    "direwolf",
    "blackfyre",
    "dothraki",
    "faceless",
    "grayscale",
    "khaleesi",
    "maester",
    "unsullied",
    "wildlings",
    "yunkai",
    "zafra",
    "nymeria",
    "harrenhal",
    "greyjoy",
    "sunspear",
    "highgarden",
    "lannisport",
    "riverrun",
    "winterfell",
    "dorne",
    "volantis",
    "meereen",
    "braavos",
    "missandei",
    "westeros",
    "stark",
];

const maxTries = 10;
var lettersGuessed = [];
var currentWord;
var guessingWord = [];
var guessesRemaining;
var gameOver = false;
var wins = 0;

//Resetting state of game. Updating HTML
function initializeGame() {
    guessesRemaining = maxTries;
    lettersGuessed = [];
    guessingWord = [];
    gameOver = false;
    currentWord = Math.floor(Math.random() * wordBank.length);
    for (var i = 0; i < wordBank[currentWord].length; i++) {
        guessingWord.push("_");
    }
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("youdie").style.cssText = "display: none";
    document.getElementById("youwin").style.cssText = "display: none";
    document.getElementById("winTotal").innerText = wins;
    document.getElementById("guessesRemaining").innerText = guessesRemaining;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
};

/* Check to see if letter is in word. 
Add letter to guessingWord array replacing underscore if correct.
Add to letters guessed if incorrect.
Updates HTML with new information */
function playerGuess(letter) {
    if (guessesRemaining > 0) {
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            var wordIndices = [];
            
            for (var i = 0; i < wordBank[currentWord].length; i++) {
                if (wordBank[currentWord][i] === letter) {
                    wordIndices.push(i);
                }
            }
            if (wordIndices.length <= 0) {
                guessesRemaining--;
            } else {
                for (var  i = 0; i < wordIndices.length; i++) {
                    guessingWord[wordIndices[i]] = letter;
                }
            }
        }
    }
    document.getElementById("winTotal").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("guessesRemaining").innerText = guessesRemaining;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    isWin();
    if (guessesRemaining === 0) {
        document.getElementById("youdie").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        gameOver = true;
    }
};

//Check to see if no underscores are left. Initiate win if so.
function isWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        gameOver = true; 
    }
}

document.onload = initializeGame();

/* Everytime a letter key is pressed check to see if game over. 
If so restart game. If not have player keep guessing. */
document.onkeydown = function(event) {
    if (gameOver) {
        initializeGame();
    } else {
        if (event.keyCode >= 65 && event.keyCode <=90) {
            playerGuess(event.key.toLowerCase());
        }
    }
};
