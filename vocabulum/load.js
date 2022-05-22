var array = [];
var letterList = [];
var guessedWords = [];
var correctlyGuessedWords = [];
var longestWord = '';
var totalWords = '';
var guessCounter = 0;
var documentHeight = document.documentElement.clientHeight;
var documentWidth = document.documentElement.clientWidth;
console.log(documentHeight);
console.log(documentWidth);
fetchData('https://raw.githubusercontent.com/Sheumais/Sheumais.github.io/main/vocabulum/nine.txt').then((result)=>{letterList = celery(result)});
const form  = document.getElementById('submit-form');



//https://aydos.com/svgedit/

async function fetchData(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.split(/\r|\n/);
};

function shakeInput() {
    var element = document.getElementById('input');
    element.classList.remove("shakeInput");
    void element.offsetWidth; // trigger a DOM reflow
    element.classList.add("shakeInput");
}

function celery(array) {
    var X = Math.floor( (1.0 - Math.random()) * 6049);
    const word = array[X];
    let wordArray = word.split('');

    let shuffled = wordArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    console.log('');

    document.getElementById(1).innerHTML = shuffled[0];
    console.log('')
    document.getElementById(2).innerHTML = shuffled[1];
    document.getElementById(3).innerHTML = shuffled[2];
    document.getElementById(4).innerHTML = shuffled[3];
    document.getElementById(5).innerHTML = shuffled[4];
    document.getElementById(6).innerHTML = shuffled[5];
    document.getElementById(7).innerHTML = shuffled[6];
    document.getElementById(8).innerHTML = shuffled[7];
    document.getElementById(9).innerHTML = shuffled[8];
    console.log(shuffled);
    return shuffled;
}

function checkWord(word, array) {
    if(array.indexOf(word) != -1) {
        const wordSplit = array[array.indexOf(word)].split('');
        const containsAll = wordSplit.every(element => {
            return letterList.includes(element);
          });
        if (guessedWords.includes(word)) {
            return ('0');
        }
        if (containsAll == true) {
            if (word.length > longestWord.length) {
                longestWord = word;
            }
            addBackgroundWord(word);
            guessedWords.push(word);
            correctlyGuessedWords.push(word);
            guessCounter += 1;
            document.getElementById('right').innerHTML = (correctlyGuessedWords.length + "/" + guessCounter);
            document.getElementById('left').innerHTML = ("Longest Word: " + longestWord + " (" + longestWord.length + ")");
            return ('1');
        }
        else {
            shakeInput();
            guessCounter += 1;
            guessedWords.push(word);
            document.getElementById('right').innerHTML = (correctlyGuessedWords.length + "/" + guessCounter);
            return ('0');
        }

    } else {
        guessCounter += 1;
        guessedWords.push(word);
        shakeInput();
        document.getElementById('right').innerHTML = (correctlyGuessedWords.length + "/" + guessCounter);
        return ('0');
    }

};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputelement = form.elements.input;
    const word = inputelement.value.toLowerCase();
    document.getElementById('input').value = '';
    fetchData('https://raw.githubusercontent.com/Sheumais/Sheumais.github.io/main/vocabulum/words.txt')
    .then(arr => checkWord(word, arr));
});

function addBackgroundWord(word) {
    var div = document.createElement('div');
    document.getElementById('wordlist').appendChild(div);
    div.className = 'bg';
    div.innerHTML = word;
    currentTop = 0.5 * documentHeight + (Math.random()-0.5) * 0.75 * documentHeight;
    let random = Math.floor(Math.random()+0.5);
    if (random == '1') {
        currentLeft = Math.random()*documentWidth/3.2;
    }
    else {
        currentLeft = 0.66 * documentWidth + Math.random()*documentWidth/3.2;
    }
    div.style.top = currentTop + "px";
    div.style.left = currentLeft + "px";
}
