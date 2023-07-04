const ball = document.querySelector('.flicker');
const menu = document.querySelector('.menu-bar');
const navList = document.querySelector('.nav-list');

const content = document.querySelectorAll('.content');

menu.addEventListener('click', e => {
    menu.classList.toggle('x');

    navList.classList.toggle('view')

});

window.addEventListener('load', e => {
    setInterval((e) => {
        ball.classList.toggle('active');
    }, 1800);

    ball.classList.toggle('active')
});

