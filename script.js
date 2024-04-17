// Acceder al contenedor del juego para añadir elementos
const canvas = document.getElementById('gameCanvas');
const playerPaddle = document.createElement('div');
const computerPaddle = document.createElement('div');
const ball = document.createElement('div');

// Añadir las clases CSS a los elementos para aplicar estilos
playerPaddle.classList.add('paddle');
computerPaddle.classList.add('paddle');
ball.classList.add('ball');

// Añadir los elementos de la paleta y la pelota al contenedor del juego
canvas.appendChild(playerPaddle);
canvas.appendChild(computerPaddle);
canvas.appendChild(ball);

// Posiciones iniciales de las paletas y la pelota
let playerYPosition = canvas.offsetHeight / 2;
let computerYPosition = canvas.offsetHeight / 2;
let ballXPosition = canvas.offsetWidth / 2;
let ballYPosition = canvas.offsetHeight / 2;

// Velocidades iniciales de la pelota en X e Y
let ballXVelocity = 2;
let ballYVelocity = 2;

// Establecer la posición inicial de las paletas
playerPaddle.style.left = '10px';
computerPaddle.style.right = '10px';

// Función para actualizar el estado del juego
function update() {
    // Mover la pelota según su velocidad
    ballXPosition += ballXVelocity;
    ballYPosition += ballYVelocity;

    // Hacer que la pelota rebote en los bordes superior e inferior del contenedor
    if (ballYPosition <= 0 || ballYPosition >= canvas.offsetHeight) {
        ballYVelocity *= -1;
    }

    // Hacer que la pelota rebote en las paletas del jugador y de la computadora
    if (ballXPosition <= 20 && ballYPosition > playerYPosition - 30 && ballYPosition < playerYPosition + 90) {
        ballXVelocity *= -1;
    }
    if (ballXPosition >= canvas.offsetWidth - 20 && ballYPosition > computerYPosition - 30 && ballYPosition < computerYPosition + 90) {
        ballXVelocity *= -1;
    }

    // Actualizar las posiciones de los elementos en la página
    ball.style.left = `${ballXPosition}px`;
    ball.style.top = `${ballYPosition}px`;
    playerPaddle.style.top = `${playerYPosition}px`;
    computerPaddle.style.top = `${computerYPosition}px`;

    // Lógica para mover la paleta de la computadora en seguimiento a la pelota
    if (computerYPosition < ballYPosition) {
        computerYPosition += 2;
    } else {
        computerYPosition -= 2;
    }

    // Continuar con el bucle de actualización
    requestAnimationFrame(update);
}

// Evento para manejar el movimiento de la paleta del jugador con las flechas del teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        playerYPosition -= 10;
        if (playerYPosition < 0) playerYPosition = 0;  // Evitar que la paleta se salga del canvas
    } else if (event.key === 'ArrowDown') {
        playerYPosition += 10;
        if (playerYPosition > canvas.offsetHeight - 60) playerYPosition = canvas.offsetHeight - 60;  // Evitar que la paleta se salga del canvas
    }
});

// Iniciar el bucle de actualización
requestAnimationFrame(update);
