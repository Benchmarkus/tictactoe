const name1 = "A";
const name2 = "B";

const player1 = player(name1)
const player2 = player(name2)
// ----------------------


const gameboard = (function () {
    const board = ['','','','','','','','',''] //new Array(9);
    const printBoard = () => {
        console.log(board[0], board[1], board[2])
        console.log(board[3], board[4], board[5])
        console.log(board[6], board[7], board[8])
    };

    return { board, printBoard };
})();

const game = (function () {
    let turn = player1
    let marker = "X";

    const isValidMove = function (id) {
        return gameboard.board[id] ? false : true;
    };

    const toggleTurn = function () {
        console.log("turn at beginning", turn);
        console.log("marker at beginning", marker);
        if (turn === player1) {
            console.log("here");
            turn = player2;
            marker = "O"
        } else {
            console.log("in else");
            turn = player1;
            marker = "X"
        };
        console.log("turn at end", turn);
        console.log("marker at end", marker);
    };

    const getTurn = () => turn;
    const getMarker = () => marker;

    return { getTurn, getMarker, toggleTurn, isValidMove };
})();

function player(name) {
    return {
        name: name
    };
}


gameboard.printBoard()

let id = 0;
console.log(game.isValidMove(id));
gameboard.board[id] = game.getMarker();
gameboard.printBoard();
game.toggleTurn();

console.log("NEXT TURN--------------");

id = 4;
console.log(game.isValidMove(id));
gameboard.board[id] = game.getMarker();
gameboard.printBoard();
game.toggleTurn();

console.log("NEXT TURN--------------");
id = 2;
console.log(game.isValidMove(id));
gameboard.board[id] = game.getMarker();
gameboard.printBoard();
game.toggleTurn();