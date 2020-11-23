const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const guessedLetters = [];
const alphabetGrid = document.querySelector(".js-alphabet-grid");
const playBtnDiv = document.querySelector(".js-btn-wrapper");
const playBtn = document.querySelector(".js-play-btn");
const submitBtn = document.querySelector(".js-submit-btn");
const textBox = document.getElementById("guess-input");
const flowerGrid = document.querySelector(".js-flower-grid");
const scoreDisplay = document.querySelector(".js-score");
const messageDisplay = document.querySelector(".js-message");
const wordDisplay = document.querySelector(".js-word-container");
const wordPlaceholderArray = [];
let gameWord = "";
let score = 6;
let isGameOver = false;


const scoreContent = document.createElement('p');

// //Create flower SVG Element. Add class and attributes.
// const flowerImage = document.createElement('img');
// flowerImage.src = "img/burg-flower.svg";
// flowerImage.className = "flower";
// flowerImage.setAttribute("alt", "flower");

// //Create stem div & add class
// const flowerStem = document.createElement('div');
// flowerStem.className = "flower-stem";
// flowerStem.setAttribute("role", "img");
// flowerStem.setAttribute("aria-label", "flower stem");



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
*/






//Functions *******************************************************
function countArrayItems(array) {
    return array.length;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateLetterGrid() {
    for (let letter of alphabet) {
        const div = document.createElement('div');
        div.className = "letter-div";
        const paragraph = document.createElement('p');
        paragraph.textContent = letter;
        div.appendChild(paragraph)
        alphabetGrid.appendChild(div);
    }
    //content to fill remaining space in grid, -- is there a better way to do this?
    for (let i = 0; i < 4; i++) {
        const div = document.createElement('div');
        div.className = "letter-div";
        const paragraph = document.createElement('p');
        paragraph.textContent = "!";
        paragraph.className = "letter-placeholder";
        div.appendChild(paragraph);
        alphabetGrid.appendChild(div);
    }
}



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


// //Create flower SVG Element. Add class and attributes.
// const flowerImage = document.createElement('img');
// flowerImage.src = "img/burg-flower.svg";
// flowerImage.className = "flower";
// flowerImage.setAttribute("alt", "flower");





// function generateFlowers() {
//     //flower-top
//     for (let i = 0; i < 6; i++) {
//         flowerImage.classList.add(`${i}-flower`);
//         // flowerGrid.appendChild(flowerImage.cloneNode(true));
//     }
//     //stems
//     for (let i = 0; i < 6; i++) {
//         flowerStem.classList.add(`${i}-flower`);
//         flowerGrid.appendChild(flowerStem.cloneNode(true));
//     }
// }

//Event Listeners**************************************************

playBtn.addEventListener("click", () => {
    //1. generate random number, to the length of the gameWordArray
    const numberOfWords = countArrayItems(gameWordArray);
    const getRandomIndex = getRandomInt(numberOfWords);

    //2. use index to choose word from gameWordArray, save in variable
    gameWord = gameWordArray[getRandomIndex].toUpperCase();

    //3. generate dashes in word-container, same length as chosen word, in variable.
    const wordLength = gameWord.length;

    for (let i = 0; i < wordLength; i++)  {
        wordPlaceholderArray.push("_");
    }

    console.log(gameWord);

    // document.querySelector(".js-word-container").textContent = wordPlaceholder;
    document.querySelector(".js-word-container").textContent = wordPlaceholderArray.join(" ");

    playBtnDiv.style.display = "none";
    // playBtnDiv.classList.add("d-none");


    //4. display content
    document.querySelector(".js-display-game").classList.remove("d-none");
    document.querySelector(".js-display-game").classList.add("d-block");

    // generateLetterGrid();
    generateFlowers();

});

submitBtn.addEventListener("click", () => {
    if (isGameOver === false) {
        submitLetter();
        textBox.value = '';
    }
});


function submitLetter() {
    let guessInput = textBox.value.toUpperCase();
    const correctLetterIndexes = [];

    if (isMoreThanOneLetter(guessInput)) {
        messageDisplay.textContent = "You entered more than one letter. Try again.";
        console.log("You entered more than one letter. Try again.");
    } else {
        if (isMatchingLetter(guessInput)) {
            setLetterPositions(gameWord, guessInput, correctLetterIndexes);
            setLetters(correctLetterIndexes, wordPlaceholderArray, guessInput);
            wordDisplay.textContent = wordPlaceholderArray.join(" ");
           
            console.log(guessInput);
            console.log(wordPlaceholderArray);
   
        } else {
            
            // const flowerChildren = flowerGrid.childNodes;
            // console.log(flowerChildren);
            // flowerChildren[1].classList.add("d-none");
            // flowerChildren[8].classList.add("d-none");
            const firstFlowerParts = document.querySelector(".flower-0");
            firstFlowerParts.setAttribute("src", "img/spike-flower.svg");

            score--; 
            if (score > 0) {
                console.log(`You have ${score} points remaining!`);
            } else {
                isGameOver = true;
                console.log ("GAME OVER");
            }  
        }
        displayScore();

}

    // guessedLetters.push(guessInput);
    // console.log(alphabet.indexOf(guessedLetters[0]));

    //else (letter is not in word)
    //change UI & decrement score...

}

function isMoreThanOneLetter(userInput) {
    if (userInput.split("").length > 1) {
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

function displayMessage() {

}