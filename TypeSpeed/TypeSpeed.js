// let Quote = ["Computer Science is a rapidly evolving field. In fact, to keep pace with its development", 
// "Acknowledgement is the most beautiful page in any project's final pages", "Asking the user a legal login-id performs authorization",
// "A system designed to prevent unauthorized access to or from a private network is called Firewall","October", "September", "Running"];


let Quote = [];

// fetch("https://type.fit/api/quotes")
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//        Quote = data;
// });


const displayElement = document.querySelector(".quote-display");
const quoteInputElement = document.querySelector(".quoteInput");
const timerElement = document.querySelector(".timer");
const scoreElement = document.querySelector(".score");
let score = 0;

function increaseScore() {
    return score++;
}

quoteInputElement.addEventListener('input', () => {

    const arrayQuote = displayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
        
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })

    if (correct) getQuotes();
})

async function getQuotes() {

    await fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        Quote = data;
        renderNewQuotes(Quote[Math.floor(Math.random() * Quote.length)].text);
    });

    // return Quote[Math.floor(Math.random() * Quote.length)];
    
}

function renderNewQuotes(new_quote) {

    const quote = new_quote;
    displayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        displayElement.appendChild(characterSpan);
    })
    quoteInputElement.value = null;
    startTimer();
    scoreElement.textContent = increaseScore();
}

let startTime;

function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

// renderNewQuotes();


getQuotes();

