// https://api.dictionaryapi.dev/api/v2/entries/en/rude

const output = document.querySelector('.output');
const input = document.querySelector('.input-word');
const searchBtn = document.querySelector('.search-btn');
const resetBtn = document.querySelector('.reset-btn');

function showOutput(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        .then(response => response.json())
        .then(json => {

            output.textContent = json[0].meanings[0].definitions[0].definition;
        })
        .catch(() => output.textContent = `Can't find the meaning of ${word}`);
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value === '') {

        output.textContent = 'Put something to search';
        input.autofocus = true;
        return;
    }

    showOutput(input.value);
});

resetBtn.addEventListener('click', () => {
    input.value = '';
    output.textContent = '';
});
