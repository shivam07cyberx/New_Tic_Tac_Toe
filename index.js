const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkResult();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.pointerEvents = 'none';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        displayResult(`${currentPlayer} wins!`);
        cells.forEach(cell => cell.classList.add('win-celebration'));
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        displayResult('Draw!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function displayResult(message) {
    resultDisplay.textContent = message;
    resultDisplay.classList.add('bubbling');
    resultDisplay.style.display = 'block';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    resultDisplay.style.display = 'none';
    resultDisplay.classList.remove('bubbling');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
        cell.classList.remove('win-celebration');
    });
}
