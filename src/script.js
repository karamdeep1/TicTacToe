var board = document.getElementById("board");
var cells = document.getElementsByClassName("cell");
var restartButton = document.getElementById("restart-btn");
var currentPlayer = "X";
var gameActive = true;

// Add click event listeners to cells
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
}

restartButton.addEventListener("click", restartGame);

function cellClicked() {
    if (!gameActive || this.textContent !== "") {
        return;
    }

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    if (checkWin()) {
        announceWinner();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        announceDraw();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    var winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (var i = 0; i < winningCombinations.length; i++) {
        var [a, b, c] = winningCombinations[i];
        if (
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent &&
            cells[a].textContent !== ""
        ) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            return false;
        }
    }

    return true;
}

function announceWinner() {
    alert("Player " + currentPlayer + " wins!");
}

function announceDraw() {
    alert("It's a draw!");
}

function restartGame() {
    for(var i = 0; i < cells.length; i++){
        cells[i].textContent = "";
        cells[i].classList.remove("X","O");
    }
    currentPlayer = "X";
    gameActive = true;
}