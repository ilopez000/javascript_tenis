const canvas = document.getElementById('gameCanvas');
const playerPaddle = document.createElement('div');
const computerPaddle = document.createElement('div');
const ball = document.createElement('div');

playerPaddle.classList.add('paddle');
computerPaddle.classList.add('paddle');
ball.classList.add('ball');

canvas.appendChild(playerPaddle);
canvas.appendChild(computerPaddle);
canvas.appendChild(ball);

let playerYPosition = canvas.offsetHeight / 2;
let computerYPosition = canvas.offsetHeight / 2;
let ballXPosition = canvas.offsetWidth / 2;
let ballYPosition = canvas.offsetHeight / 2;
let ballXVelocity = 2;
let ballYVelocity = 2;

playerPaddle.style.left = '10px';
computerPaddle.style.right = '10px';

function update() {
    // Mover la pelota
    ballXPosition += ballXVelocity;
    ballYPosition += ballYVelocity;

    // Rebotar en las paredes superior e inferior
    if (ballYPosition <= 0 || ballYPosition >= canvas.offsetHeight) {
        ballYVelocity *= -1;
    }

    // Rebotar en las paletas
    if (ballXPosition <= 20 && ballYPosition > playerYPosition - 30 && ballYPosition < playerYPosition + 90) {
        ballXVelocity *= -1;
    }
    if (ballXPosition >= canvas.offsetWidth - 20 && ballYPosition > computerYPosition - 30 && ballYPosition < computerYPosition + 90) {
        ballXVelocity *= -1;
    }

    // Actualizar posiciones
    ball.style.left = `${ballXPosition}px`;
    ball.style.top = `${ballYPosition}px`;
    playerPaddle.style.top = `${playerYPosition}px`;
    computerPaddle.style.top = `${computerYPosition}px`;

    // Mover la paleta del computador
    if (computerYPosition < ballYPosition) {
        computerYPosition += 2;
    } else {
        computerYPosition -= 2;
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        playerYPosition -= 10;
        if (playerYPosition < 0) playerYPosition = 0;
    } else if (event.key === 'ArrowDown') {
        playerYPosition += 10;
        if (playerYPosition > canvas.offsetHeight - 60) playerYPosition = canvas.offsetHeight - 60;
    }
});

requestAnimationFrame(update);
