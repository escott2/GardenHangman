const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const guessedLetters = [];
const alphabetGrid = document.querySelector(".js-alphabet-grid");
const playBtnDiv = document.querySelector(".js-btn-wrapper");
const playBtn = document.querySelector(".js-play-btn");
const submitBtn = document.querySelector(".js-submit-btn");
const textBox = document.getElementById("guess-input");
const flowerGrid = document.querySelector(".js-flower-grid");

//create flower SVG & add class
const flowerImage = document.createElement('img');
flowerImage.src = "img/burg-flower.svg";
flowerImage.className = "flower";

//create stem div & add class
const flowerStem = document.createElement('div');
flowerStem.className = "flower-stem";


let gameWord = "";
const wordPlaceholderArray = [];
let score = 6;

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
        flowerGrid.appendChild(flowerImage.cloneNode(true));
    }
    //stems
    for (let i = 0; i < 6; i++) {
        flowerGrid.appendChild(flowerStem.cloneNode(true));
    }
}

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

    generateLetterGrid();
    generateFlowers();

});

submitBtn.addEventListener("click", () => {
    submitLetter();
    //issue--requires a double click to work, when this line of code exists.
    // textBox.value = '';
    console.log("clicked");

});


function submitLetter() {
    let guessInput = textBox.value.toUpperCase();
    const correctLetters = [];
    
    if (isMoreThanOneLetter(guessInput)) {
        console.log("You entered more than one letter. Try again.")
    } else {
        if (isMatchingLetter(guessInput)) {
            setLetter(gameWord, guessInput, correctLetters) 
            

     
        
    
        //Check for matching letter and save index to array.

        console.log(guessInput);

        // if (gameWord.split("").includes(guessInput)) {
        //     for (let i = 0; i < gameWord.length; i++) {
        //         if (guessInput === gameWord[i].toUpperCase()) {
        //             correctLetters.push(i);
        //             }
        //     }
        
            //set correctly guessed letter into array
            correctLetters.forEach((index) => {
                wordPlaceholderArray[index] = guessInput;
            });
            console.log(wordPlaceholderArray);
            document.querySelector(".js-word-container").textContent = wordPlaceholderArray.join(" ");

        } else {
            score--; 
            if (score > 0) {
                console.log(`You have ${score} points remaining!`);
            } else {
                console.log ("GAME OVER");
            }
            
        }
}

    guessedLetters.push(guessInput);
    console.log(alphabet.indexOf(guessedLetters[0]));

    textBox.value = '';

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

function setLetter(word, userInput, correctLetters) {
    for (let i = 0; i < word.length; i++) {
        if (userInput === word[i].toUpperCase()) {
            correctLetters.push(i);
        }
    }
} 