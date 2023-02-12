const hour = document.querySelector('.hour-section');
const minute = document.querySelector('.minute-section');
const second = document.querySelector('.second-section');

let sec = new Date().getSeconds();
let hours = new Date().getHours();
let minutes = new Date().getMinutes();

let amOrPm = hours >= 12 ? 'pm' : 'am';


setInterval(() => {
    
    ++ sec;
    second.textContent = sec < 10 && sec >= 0 ? '0' + sec : sec;

    if (sec == 00) ++ minutes;
    minute.textContent = minutes < 10 && minutes >= 0 ? '0' + minutes : minutes;

    if (minutes == 00) ++ hours;
    hour.textContent = hours < 10 && hours >= 0 ? '0' + hours : hours;

    if (sec >= 59) sec = -1;
}, 1000)
