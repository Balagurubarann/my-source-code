// https://api.frankfurter.app/currencies

const container = document.querySelector('.container');
const selectObject = document.querySelectorAll('.selector');
const inputBox = document.querySelector('.input');
const resultBox = document.querySelector('.result');
const convertBtn = document.querySelector('.btn'); 
const title = document.querySelector('.title');

fetch('https://api.frankfurter.app/currencies')
    .then(response => response.json())
    .then(json => displayDropDown(json))
    .catch(() => container.classList.toggle('red'));


function displayDropDown(res) {
    const currencyArray = Object.entries(res);

    currencyArray.forEach(result => {
        let opt = `<option value="${result[0]}">${result[0]}</option>`;
        selectObject[0].innerHTML += opt;
        selectObject[1].innerHTML += opt;
    });
}

convertBtn.addEventListener('click', () => {
    let currOne = selectObject[0].value;
    let currTwo = selectObject[1].value;
    let inputVal = input.value;

    if (currOne === currTwo) {
        title.textContent = 'Use Different Currency';
        container.classList.toggle('red');
    } else {
        title.textContent = 'Currency Convertor';
        convert(currOne, currTwo, inputVal);
    }
});

function convert(currOne, currTwo, inputVal) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputVal}&from=${currOne}&to=${currTwo}`)
        .then(resp => resp.json())
        .then((data) => {
            resultBox.value = `${Object.values(data.rates)[0]}`;
        });
}
