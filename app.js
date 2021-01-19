const title = document.querySelector("h1");

const guessedLetters = [];
const playBtnDiv = document.querySelector(".js-btn-wrapper");
const playBtn = document.querySelector(".js-play-btn");
const submitBtn = document.querySelector(".js-submit-btn");
const textBox = document.getElementById("guess-input");
const flowerGrid = document.querySelector(".js-flower-grid");
const scoreDisplay = document.querySelector(".js-score");
const messageDisplay = document.querySelector(".js-message");
const wordDisplay = document.querySelector(".js-word-container");
const wordPlaceholderArray = [];
// let gameWord = "";
let score = 6;
let message = "Enter a letter to get started!"
let targetFlowerIndex = -1;
let isGameOver = false;

const scoreContent = document.createElement('p');
const messageContent = document.createElement('p');



/*Validation & Additions Needed...
    -- Guessed letters displayed in grid. Black if guess, gray if not.
    -- If the same letter is submitted "You already guessed that. (don't decrement)"
            *** if letter guessed is in guessed array.
    -- Handle winning and losing.
    -- If more than one letter is submitted "You may only submit one letter. Try again. (don't decrement)"
    -- Double click event listener. Tackle when brain rested.
    -- Clean up code. Pass variables into functions rather than accessing global.
    -- Option to choose new word..
    -- Extra.. "You've played all words."
    -- When game is over, show the rest of the word.
    -- Extra - Merriam Webster Dictionary API, display definition as hint. Learn new words.
*/






//Functions *******************************************************
function countArrayItems(array) {
    return array.length;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// function generateLetterGrid() {
//     for (let letter of alphabet) {
//         const div = document.createElement('div');
//         div.className = "letter-div";
//         const paragraph = document.createElement('p');
//         paragraph.textContent = letter;
//         div.appendChild(paragraph)
//         alphabetGrid.appendChild(div);
//     }
//     //content to fill remaining space in grid, -- is there a better way to do this?
//     for (let i = 0; i < 4; i++) {
//         const div = document.createElement('div');
//         div.className = "letter-div";
//         const paragraph = document.createElement('p');
//         paragraph.textContent = "!";
//         paragraph.className = "letter-placeholder";
//         div.appendChild(paragraph);
//         alphabetGrid.appendChild(div);
//     }
// }



function generateFlowers() {
    //flower-top
    for (let i = 0; i < 6; i++) {
        const flowerImage = document.createElement('img');
        flowerImage.src = "img/burg-flower.svg";
        flowerImage.classList.add("flower", `flower-${i}`);
        flowerImage.setAttribute("alt", "flower");
        flowerGrid.appendChild(flowerImage);
    }
    //stems
    for (let i = 0; i < 6; i++) {
        const flowerStem = document.createElement('div');
        flowerStem.classList.add("flower-stem");
        flowerStem.setAttribute("role", "img");
        flowerStem.setAttribute("aria-label", "flower stem");
        flowerGrid.appendChild(flowerStem);
    }
}

//Event Listeners**************************************************

playBtn.addEventListener("click", () => {

    title.style.opacity = "0";
    //1. generate random number, to the length of the gameWordArray
    //START EDITING, BEFORE API
    // const numberOfWords = countArrayItems(gameWordArray);
    // const getRandomIndex = getRandomInt(numberOfWords);
    //END EDITING, BEFORE API


    //2. use index to choose word from gameWordArray, save in variable
    //START EDITING, BEFORE API
    // gameWord = gameWordArray[getRandomIndex].toUpperCase();
    //END EDITING, BEFORE API

    getWords(dataMuseUrl)
    .then(generateData)
    .then((data) => { 
        //3. generate dashes in word-container, same length as chosen word, in variable.
        const wordLength = gameWord.length;
    
        for (let i = 0; i < wordLength; i++)  {
             wordPlaceholderArray.push("_");
         }
    
        // document.querySelector(".js-word-container").textContent = wordPlaceholder;
        document.querySelector(".js-word-container").textContent = wordPlaceholderArray.join(" ");
    
        playBtnDiv.style.display = "none";
        // // playBtnDiv.classList.add("d-none");
    
    
        // //4. display content
        document.querySelector(".js-display-game").classList.remove("d-none");
        document.querySelector(".js-display-game").classList.add("d-block");
    
        // generateLetterGrid();
        generateFlowers();
        displayMessage(message);
        displayScore(score);})
    .catch( e => {
        console.log("Something went wrong");
        console.error(e);
    })



    // //3. generate dashes in word-container, same length as chosen word, in variable.
    // const wordLength = gameWord.length;

    // for (let i = 0; i < wordLength; i++)  {
    //     wordPlaceholderArray.push("_");
    // }

    // // document.querySelector(".js-word-container").textContent = wordPlaceholder;
    // document.querySelector(".js-word-container").textContent = wordPlaceholderArray.join(" ");

    // playBtnDiv.style.display = "none";
    // // playBtnDiv.classList.add("d-none");


    // //4. display content
    // document.querySelector(".js-display-game").classList.remove("d-none");
    // document.querySelector(".js-display-game").classList.add("d-block");

    // generateLetterGrid();
    // generateFlowers();
    // displayMessage(message);
    // displayScore(score);

});

submitBtn.addEventListener("click", () => {
    if (isGameOver === false) {
        submitLetter();
        textBox.value = '';
    }
});

document.addEventListener("keydown", (e)=> {
    if (e.key == "Enter") {
        if (isGameOver === false) {
            submitLetter();
            textBox.value = '';
        }
    }
});

function submitLetter() {
    let guessInput = textBox.value.toUpperCase();
    const correctLetterIndexes = [];

    if (isMoreThanOneLetter(guessInput)) {
        message = "You entered more than one letter. Try again.";
        displayMessage(message);
    } else if (isPrevGuessedLetter(guessInput)) {
        message = "You already guessed that letter. Try again."
        displayMessage(message);
    } else {
        if (isMatchingLetter(guessInput)) {
            setLetterPositions(gameWord, guessInput, correctLetterIndexes);
            setLetters(correctLetterIndexes, wordPlaceholderArray, guessInput);
            wordDisplay.textContent = wordPlaceholderArray.join(" ");
            message = "You guessed correctly!"
            displayMessage(message);
   
        } else {
            targetFlowerIndex++;
            score--; 
            transformFlower(targetFlowerIndex);
            if (score > 0) {
                message = `Too bad. You guessed incorrectly! ${score} incorrect guesses remain.`;
                displayMessage(message);
            } else {
                isGameOver = true;
                message = "GAME OVER";
                displayMessage(message);
                wordDisplay.textContent = gameWord;

            }  
        }
        displayScore();
        guessedLetters.push(guessInput);
}

}

function isMoreThanOneLetter(userInput) {
    if (userInput.split("").length > 1) {
        return true;
    }
}

function isPrevGuessedLetter(userInput) {
    if (guessedLetters.includes(userInput)) {
        return true;
    }
}

function isMatchingLetter(userInput) {
    if (gameWord.split("").includes(userInput)) {
        return true;
    }
}

function setLetterPositions(word, userInput, correctLetterIndexes) {
    for (let i = 0; i < word.length; i++) {
        if (userInput === word[i].toUpperCase()) {
            correctLetterIndexes.push(i);
        }
    }
} 

function setLetters(correctLetterIndexes, wordPlaceholderArray, userInput) {
    correctLetterIndexes.forEach((index) => {
        wordPlaceholderArray[index] = userInput;
    });
}

function displayScore() {
    if (scoreDisplay.querySelector("scoreContent") !== null) {
        scoreDisplay.removeChild(scoreContent);
    }
    scoreContent.textContent = `${score}`;
    scoreDisplay.appendChild(scoreContent);
}

function displayMessage(message) {
    if (messageDisplay.querySelector("messageContent") !== null) {
        messageDisplay.removeChild(messageContent);
    }
    messageDisplay.textContent = message;
}

function transformFlower(targetFlowerIndex) {
    const targetFlower = document.querySelector(`.flower-${targetFlowerIndex}`);
    targetFlower.setAttribute("src", "img/spike-flower.svg");
}