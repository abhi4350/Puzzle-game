// Word bank
const words = ["hangman", "javascript", "programming", "computer", "code"];

// Select a random word from the word bank
let randomWord = words[Math.floor(Math.random() * words.length)];

// Array to store the guessed letters
const guessedLetters = [];

// Variable to track the number of incorrect guesses
let incorrectGuesses = 0;

// DOM elements
const wordContainer = document.getElementById("word-container");
const incorrectGuessesElement = document.getElementById("incorrect-guesses");
const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const messageElement = document.getElementById("message");

// Function to display the current state of the word with blanks for unknown letters
function displayWord() {
  let display = "";
  for (let i = 0; i < randomWord.length; i++) {
    if (guessedLetters.includes(randomWord[i])) {
      display += randomWord[i];
    } else {
      display += "_";
    }
    display += " ";
  }
  wordContainer.textContent = display;
}

// Function to check if the player has won the game
function checkWin() {
  for (let i = 0; i < randomWord.length; i++) {
    if (!guessedLetters.includes(randomWord[i])) {
      return false;
    }
  }
  return true;
}

// Function to handle a player's guess
function makeGuess(guess) {
  if (guessedLetters.includes(guess)) {
    messageElement.textContent = "You already guessed that letter.";
    return;
  }
  
  guessedLetters.push(guess);
  
  if (randomWord.includes(guess)) {
    messageElement.textContent = "Correct guess!";
    if (checkWin()) {
      messageElement.textContent = "Congratulations, you won!";
      input.disabled = true;
      submitButton.disabled = true;
    }
  } else {
    messageElement.textContent = "Incorrect guess.";
    incorrectGuesses++;
    incorrectGuessesElement.textContent = guessedLetters.join(", ");
    if (incorrectGuesses === 6) {
      messageElement.textContent = "Game over, you lost!";
      input.disabled = true;
      submitButton.disabled = true;
    }
  }
  
  displayWord();
  input.value = "";
}

// Start the game
displayWord();

// Event listener for player's input
submitButton.addEventListener("click", function() {
  const guess = input.value.toLowerCase();
  makeGuess(guess);
});