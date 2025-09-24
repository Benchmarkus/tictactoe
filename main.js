// initiate as global vars
let player1 = "";
let player2 = "";

// html elements
const playerNamesArea = document.querySelector(".player-names-area");
const startGameButton = document.querySelector("#button-start");
const resetGameButton = document.querySelector("#button-reset");
const gameBoardElement = document.querySelector(".game-board");
const instructionElement = document.querySelector(".game-text-area");
const boardButtons = document.querySelector(".game-board");

// start button click event
startGameButton.addEventListener("click", (e)=>{
    const name1 = document.querySelector("#player1-name").value
    const name2 = document.querySelector("#player2-name").value
    
    player1 = player(name1);
    player2 = player(name2);
    
    playerNamesArea.style.display = "none";
    startGameButton.style.display = "none";
    resetGameButton.style.display = "block";
    gameBoardElement.style.display = "grid"
    
    game.setTurn(player1);
    instructionElement.textContent = `${player1.name}'s turn`
})

// reset button click event
resetGameButton.addEventListener("click", (e)=>{
    game.setMarker("X");
    game.setTurn(player1);
    gameboard.resetBoard();
    gameBoardElement.querySelectorAll("div").forEach(div => {
        div.textContent = "";
    }); 
    instructionElement.textContent = `${game.getTurn().name}'s turn`
})

// -main logic-
// board grid events 
boardButtons.addEventListener("click", (e)=>{
    // in case user clicks the grid borders which is possible
    if (!e.target.classList.contains("box")) {
        console.log("missed box div");
        return;
    };
    // button id is same as board indexes
    const id = e.target.id;

    // make sure the grid place doesn't already have a marker
    if (!game.isValidMove(id)){
        console.log("not valid move, try again");
        return;
    };

    console.log("chosen id:", e.target.id, "current marker:", game.getMarker());

    // set marker to board
    gameboard.board[id] = game.getMarker();
    
    // set marker to DOM
    e.target.textContent = game.getMarker();

    gameboard.printBoard();

    // check the win/end game condition
    // declare winner or keep playing
    const currentPlayerState = game.checkForWinner();
    if (currentPlayerState){
        console.log("Game over, winner", currentPlayerState.name);
        instructionElement.textContent = `${currentPlayerState.name} HAS WON!`
    } else {
    game.toggleTurn();
    instructionElement.textContent = `${game.getTurn().name}'s turn`
    }
})
// ----------------------

// IIFE, gameboard management
const gameboard = (function () {
    let board = ['','','','','','','','',''];
    const printBoard = () => {
        console.log(`
            ${board[0]}|${board[1]}|${board[2]}
            ${board[3]}|${board[4]}|${board[5]}
            ${board[6]}|${board[7]}|${board[8]}
            `);
    };
    const resetBoard = () => {
        board.fill("");
    };

    return { board, printBoard, resetBoard };
})();


// IIFE, main game methods
const game = (function () {
    let turn = player1
    let marker = "X";

    const isValidMove = function (id) {
        return gameboard.board[id] ? false : true;
    };

    // switch whose turn it is
    const toggleTurn = function () {
        console.log("turn:",turn)
        console.log("player1:",player1)
        if (turn === player1) {
            console.log("in if")
            turn = player2;
            marker = "O";
        } else {
            console.log("in else")
            turn = player1;
            marker = "X";
        };
    };

    const getTurn = () => turn;
    const getMarker = () => marker;

    const setTurn = (x) => turn = x;
    const setMarker = (x) => marker = x;

    // winning condition check
    const checkForWinner = function () {
        const row1 = new Set ([gameboard.board[0], gameboard.board[1], gameboard.board[2]]);
        const row2 = new Set ([gameboard.board[3], gameboard.board[4], gameboard.board[5]]);
        const row3 = new Set ([gameboard.board[6], gameboard.board[7], gameboard.board[8]]);
        
        const col1 = new Set ([gameboard.board[0], gameboard.board[3], gameboard.board[6]]);
        const col2 = new Set ([gameboard.board[1], gameboard.board[4], gameboard.board[7]]);
        const col3 = new Set ([gameboard.board[2], gameboard.board[5], gameboard.board[8]]);

        const diag1 = new Set ([gameboard.board[0], gameboard.board[4], gameboard.board[8]]);
        const diag2 = new Set ([gameboard.board[2], gameboard.board[4], gameboard.board[6]]);

        const possibilityArr = [row1, row2, row3, col1, col2, col3, diag1, diag2];

        for (const s of possibilityArr) {
            if (s.size === 1) {
                if (s.has("X")) {
                    return player1;
                }
                if (s.has("O")) {
                    return player2;
                }
            }
        }
        return undefined;  
    };

    return { getTurn, getMarker, setTurn, setMarker, toggleTurn, isValidMove, checkForWinner };
})();

// player object factory function
function player(name) {
    return {
        name: name
    };
}