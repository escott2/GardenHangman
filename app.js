const gameWordArray = ["environment", "watermelon", "maple", "meadow", "autumn", "grass", "season", "sunshine", "temperature"];

const playBtn = document.querySelector(".js-play-btn");
const submitBtn = document.querySelector(".js-submit-btn");
let gameWord = "";


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

    const wordPlaceholderArray = [];
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
    /*1. Letter submitted checked for in the array.
    String methods and array methods to do this,
    is it better to work with a string or array?*/

    let guessLetter = document.getElementById("guess-input").value.toUpperCase();
    console.log(guessLetter);

    //2. Logic required, two paths  

    //if letter is in word
    const letterPositionIndex = [];
    

    if (gameWord.split("").includes(guessLetter)) {
        for (let i = 0; i < gameWord.length; i++) {
            if (guessLetter === gameWord[i].toUpperCase()) {
                letterPositionIndex.push(i);
            }
    }

    console.log(letterPositionIndex);

    //guess letter(s) placed in placeholder array.

    //if letter is not in word
        //change UI & decrement score...


    }

});