const gameWordArray = ["environment", "watermelon", "maple", "meadow", "autumn", "grass", "season", "sunshine", "temperature"];
const playBtn = document.querySelector(".js-play-btn");
const submitBtn = document.querySelector(".js-submit-btn");
const textBox = document.getElementById("guess-input");
let gameWord = "";
const wordPlaceholderArray = [];
let score = 6;

/*Validation & Additions Needed...
    -- If the same letter is submitted "You already guessed that. (don't decrement)"
    -- If more than one letter is submitted "You may only submit one letter. Try again. (don't decrement)"
    -- Double click event listener. Tackle when brain rested.
    -- Clean up code. Pass variables into functions rather than accessing global.
*/






//Functions *******************************************************
function countArrayItems(array) {
    return array.length;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
    // let wordPlaceholder = "";
    // for (let i = 0; i < wordLength; i++) {
    //     wordPlaceholder += "_ ";
    // }

    for (let i = 0; i < wordLength; i++)  {
        wordPlaceholderArray.push("_");
    }

    console.log(gameWord);

    // document.querySelector(".js-word-container").textContent = wordPlaceholder;
    document.querySelector(".js-word-container").textContent = wordPlaceholderArray.join(" ");


    //4. display content
    document.querySelector(".js-display-game").classList.remove("d-none");
    document.querySelector(".js-display-game").classList.add("d-block");

});

submitBtn.addEventListener("click", () => {
    submitLetter();
    //issue--requires a double click to work, when this line of code exists.
    textBox.value = '';
    console.log("clicked");

});

function submitLetter() {


    //local variables*************
    let guessLetter = textBox.value.toUpperCase();
    const letterPositionIndex = [];

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

    //else (letter is not in word)
    //change UI & decrement score...

}