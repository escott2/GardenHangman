const dataMuseUrl = "https://api.datamuse.com//words?rel_jja=garden&topics=nature&md=d";

const wordContainer = document.querySelector(".word-data-container");
const wordBtn = document.querySelector(".word-btn");



async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function getWords(url) {
    const wordsJSON = await getJSON(url);
    console.log(wordsJSON)

    const words = wordsJSON.map(result => {
        const word = result.word;
        let definition = result.defs[0]
        definition = definition.substring(2);
        definition = definition[0].toUpperCase() + definition.substring(1);

        return {word, definition};
    });

    // return words;
    return Promise.all(words);
}

const generateHTML = (data) => {
    console.log(data);
    const list = document.createElement("ul");
    wordContainer.appendChild(list);

    data.map( word => {
        const listItem = document.createElement("li");
        list.appendChild(listItem);
        listItem.textContent = `Word: ${word.word}, Definition: ${word.definition}`;
        console.log("testing generate html");
    });
}

let dataWord = "";

const generateData = (data) => {
    console.log(data);
    const h2 = document.createElement("h2");
    wordContainer.appendChild(h2);
    const p = document.createElement("p");
    wordContainer.appendChild(p);

    const randomIndex = getRandomInt(data.length);

    // console.log(data[randomIndex].word);
    console.log(randomIndex);

    h2.textContent = `${data[randomIndex].word}`;
    p.textContent = `${data[randomIndex].definition}`;

    dataWord = data[randomIndex].word;

    // data.map (entry => {
    //     h2.textContent = `${entry.word}`;
    //     p.textContent = `${entry.definition}`;
    // }
    //)
}



wordBtn.addEventListener("click", (event) => {
    console.log("clicked");
    event.target.textContent = "Loading";

    getWords(dataMuseUrl)
        // .then(generateHTML)
        // .then((data) => {console.log(data.length)})
        .then(generateData)
        .catch( e => {
            wordContainer.innerHTML = "<h3>Something went wrong!</h3>";
            console.error(e);
        })


        // .finally( () => event.target.remove() )   
});

