let player1 = "";
let player2 = "";

const playerNamesArea = document.querySelector(".player-names-area");
const startGameButton = document.querySelector("#button-start");
const resetGameButton = document.querySelector("#button-reset");
const gameBoardElement = document.querySelector(".game-board");
const instructionElement = document.querySelector(".game-text-area");

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

resetGameButton.addEventListener("click", (e)=>{
    game.setMarker("X");
    game.setTurn(player1);
    gameboard.resetBoard();
    gameBoardElement.querySelectorAll("div").forEach(div => {
        div.textContent = "";
    }); 
    instructionElement.textContent = `${game.getTurn().name}'s turn`
})

// -------------------------------------------------------
const boardButtons = document.querySelector(".game-board");
boardButtons.addEventListener("click", (e)=>{
    if (!e.target.classList.contains("box")) {
        console.log("missed box div");
        return;
    };
    const id = e.target.id;
    if (!game.isValidMove(id)){
        console.log("not valid move, try again");
        return;
    };

    console.log("chosen id:", e.target.id, "current marker:", game.getMarker());

    gameboard.board[id] = game.getMarker();
    e.target.textContent = game.getMarker();

    gameboard.printBoard();

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



const game = (function () {
    let turn = player1
    let marker = "X";

    const isValidMove = function (id) {
        return gameboard.board[id] ? false : true;
    };

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

function player(name) {
    return {
        name: name
    };
}


// gameboard.printBoard()

// let id = 3;
// console.log(game.isValidMove(id));
// gameboard.board[id] = game.getMarker();
// gameboard.printBoard();
// console.log(game.checkForWinner());
// game.toggleTurn();

// console.log("NEXT TURN--------------");


