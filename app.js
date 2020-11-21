const gameWordArray = ["environment", "watermelon", "maple", "meadow", "autumn", "grass", "season", "sunshine", "temperature"];
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
        div.classList = "letter-div";
        const paragraph = document.createElement('p');
        paragraph.textContent = letter;
        div.appendChild(paragraph)
        alphabetGrid.appendChild(div);
    }
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
    const countWords = countArrayItems(gameWordArray);
    const getRandomIndex = getRandomInt(countWords);

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
    textBox.value = '';
    console.log("clicked");

});

function submitLetter() {
    let guessLetter = textBox.value.toUpperCase();
    const letterPositionIndex = [];
    if (guessLetter.split("").length > 1) {
        console.log("You entered more than one letter. Try again.")
        //add a way to show user that this is invalid, shaking box or message.

    } else {

    console.log(guessLetter);

    //Check for matching letter and save index to array.

    if (gameWord.split("").includes(guessLetter)) {
        for (let i = 0; i < gameWord.length; i++) {
            if (guessLetter === gameWord[i].toUpperCase()) {
                letterPositionIndex.push(i);
                }
        }
      
        //set correctly guessed letter into array
        letterPositionIndex.forEach((index) => {
            wordPlaceholderArray[index] = guessLetter;
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

    guessedLetters.push(guessLetter);
    console.log(alphabet.indexOf(guessedLetters[0]));


    //else (letter is not in word)
    //change UI & decrement score...

}