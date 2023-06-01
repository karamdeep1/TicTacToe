var board = document.getElementById("board");
var cells = document.getElementsByClassName("cell");
var restartButton = document.getElementById("restart-btn");
var currentPlayer = "X";
var gameActive = true;

// Add click event listeners to cells
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
}
//adds click event to restart button
restartButton.addEventListener("click", restartGame);

function cellClicked() {
    //if cell is full or game is over dont do anything
    if (!gameActive || this.textContent !== "") {
        return;
    }
    //sets cell to be current Players value
    this.textContent = currentPlayer;
    //adds currentPlayer to the class list
    this.classList.add(currentPlayer);
    //if one player wins announce the winner and stop the game
    if (checkWin()) {
        announceWinner();
        gameActive = false;
        return;
    }
    //if game is a draw then announce draw and stop the game
    if (checkDraw()) {
        announceDraw();
        gameActive = false;
        return;
    }
    //toggles between X and O, === is strictly equal operator, if player is x then player becomes 0 and if its not x then it becomes x
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    //different winning combinations
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
    //iterates through winningCombinations
    for (var i = 0; i < winningCombinations.length; i++) {
        //sets variables a, b, and c for all the rows
        var [a, b, c] = winningCombinations[i];
        if (
            //checks if the 3 cells in the winning combinations all match
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent &&
            cells[a].textContent !== ""
        ) {
            //if they all match return true
            return true;
        }
    }
    //if not return false
    return false;
}

function checkDraw() {
    //checks if all cells are filled
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            //if none filled return false
            return false;
        }
    }
    //if all filled return true
    return true;
}

function announceWinner() {
    //alerts that the current player wins
    alert("Player " + currentPlayer + " wins!");
}

function announceDraw() {
    //announces draw
    alert("It's a draw!");
}

function restartGame() {
    //iterates through cells removing their value
    for(var i = 0; i < cells.length; i++){
        cells[i].textContent = "";
        //removes X and O from the class list
        cells[i].classList.remove("X","O");
    }
    //sets currentPlayer back to X
    currentPlayer = "X";
    //starts the game
    gameActive = true;
}