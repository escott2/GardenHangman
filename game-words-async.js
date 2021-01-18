const dataMuseUrl = "https://api.datamuse.com//words?rel_jja=garden&topics=nature&md=d";
const definitionContainer = document.querySelector(".definition-container");
const wordBtn = document.querySelector(".word-btn");
let gameWord = "";

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
    
    const words = wordsJSON.map(result => {
        const word = result.word;
        let definition = result.defs[0]
        definition = definition.substring(2);
        definition = definition[0].toUpperCase() + definition.substring(1);

        return {word, definition};
    });

    return words;
    // return Promise.all(words);
}


const generateData = (data) => {
    const randomIndex = getRandomInt(data.length);

    const h2 = document.createElement("h2");
    definitionContainer.appendChild(h2);
    const p = document.createElement("p");
    definitionContainer.appendChild(p);

    h2.textContent = "Definition:";
    p.textContent = `${data[randomIndex].definition}`;

    gameWord = data[randomIndex].word.toUpperCase();
    return data;
}


