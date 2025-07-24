
let jumpStarted = false;
let car = document.querySelector('.car');

let keyPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !keyPressed && !jumpStarted) {
        keyPressed = true;
        jumpStarted = true;
        car.style.top = '15rem';

        setTimeout(() => {
            car.style.top = '30rem';
            jumpStarted = false;
        }, 400);

        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        keyPressed = false;
    }
});

let road=document.querySelector('.road');
let left = 100;
let spacing = 200;
for (let i = 0; i < 5000; i += spacing) {
    let hurdle = document.createElement('img');
    hurdle.classList.add('hurdle');
    hurdle.classList.add('tree');
    hurdle.src = './tree.png';
    hurdle.style.position = 'absolute';
    hurdle.style.left = left + 'rem';
    road.appendChild(hurdle);
    left += spacing;
}
left = 200;
spacing = 200;
for (let i = 0; i < 5000; i += spacing) {
    let hurdle = document.createElement('img');
    hurdle.classList.add('hurdle');
    hurdle.classList.add('building');
    hurdle.src = './skyscraper.png';
    hurdle.style.position = 'absolute';
    hurdle.style.left = left + 'rem';
    road.appendChild(hurdle);
    left += spacing;
}
left = 700/3;
spacing = 700/3;
for (let i = 0; i < 5000; i += spacing) {
    let hurdle = document.createElement('img');
    hurdle.classList.add('hurdle');
    hurdle.classList.add('mountain');
    hurdle.src = './mountain.png';
    hurdle.style.position = 'absolute';
    hurdle.style.left = left + 'rem';
    road.appendChild(hurdle);
    left += spacing;
}
left = 50;
spacing = 10;
for (let i = 0; i < 5000; i += spacing) {
    let coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = left + 'rem';
    road.appendChild(coin);
    let innercoin = document.createElement('div');
    innercoin.classList.add('innercoin');
    coin.appendChild(innercoin);
    left += spacing;
}
let move = false;

setInterval(() => {
    const coinmove = document.querySelectorAll('.coin');

    coinmove.forEach(coin => {
        coin.style.transition = 'transform 0.5s';
        coin.style.transform = move ? 'rotateY(-180deg)' : 'rotateY(180deg)';
    });

    move = !move;
}, 500);



const sound = new Audio('./audio.mp3');
let audio=document.querySelectorAll('audio');
let id;
let isGameRunning;
let start = document.querySelector('.start');
start.addEventListener('click', () => {
        road.style.transform = 'translate(-100%, 0%)';
        road.style.transition= '75s linear';
        isGameRunning=true;
    sound.play();
})

let score=0;
setInterval(() => {
    if (!isGameRunning) return;

    const carRect = car.getBoundingClientRect();
    const hurdles = document.querySelectorAll('.hurdle');

    hurdles.forEach(hurdle => {
        const hurdleRect = hurdle.getBoundingClientRect();
        const overlap = !(
            carRect.right < hurdleRect.left ||
            carRect.left > hurdleRect.right ||
            carRect.bottom < hurdleRect.top ||
            carRect.top > hurdleRect.bottom
        );
        if (overlap) {
            road.style.transition='none'
            road.style.transform = 'translate(0rem,0rem)';
            isGameRunning = false;
            document.querySelector('.restart').style.display='block';
            document.querySelector('.scoredisplay').innerHTML = `Score: ${Math.floor(score)}<br>Coins: ${coinsCollected}`;
            score=0;
            coinsCollected=0;
            clearInterval(id);
            sound.pause();
        }
    });
    score+=10;
    document.querySelector('.score').textContent=`Score: ${Math.floor(score)}`;
}, 100);
document.querySelector('.restart').addEventListener('click', () => {
  location.reload();
});


let coinsCollected=0;
setInterval(() => {
    if (!isGameRunning) return;

    const carRect = car.getBoundingClientRect();
    const hurdles = document.querySelectorAll('.coin');

    hurdles.forEach(hurdle => {
        const hurdleRect = hurdle.getBoundingClientRect();
        const overlap = !(
            carRect.right < hurdleRect.left ||
            carRect.left > hurdleRect.right ||
            carRect.bottom < hurdleRect.top ||
            carRect.top > hurdleRect.bottom
        );
        if (overlap) {
            coinsCollected++;
            hurdle.style.display='none'
        }
    });
    document.querySelector('.coins').textContent=`Coins collected: ${coinsCollected}`;
}, 40);

document.querySelector('.ok').addEventListener('click',()=>{
    document.querySelector('.rules').style.display='none';
})