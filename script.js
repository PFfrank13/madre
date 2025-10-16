const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let isGameOver = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dino.classList.add('jump');
    setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false;
    }, 500);
}

function checkCollision() {
    if (isGameOver) return;

    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
    ) {
        isGameOver = true;
        alert('Game Over! Tu puntuación fue: ' + score);
        resetGame();
    }
}

function updateScore() {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }
}

function resetGame() {
    score = 0;
    isGameOver = false;
    scoreDisplay.textContent = 'Score: 0';
    cactus.style.animation = 'none';
    void cactus.offsetWidth; // Trigger reflow
    cactus.style.animation = 'moveCactus 2s linear infinite';
}

setInterval(checkCollision, 10);
setInterval(updateScore, 100);