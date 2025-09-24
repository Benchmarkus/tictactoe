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

    const checkForWinner = function () {
        const row1 = new Set ([gameboard.board[0], gameboard.board[1], gameboard.board[2]]);
        const row2 = new Set ([gameboard.board[3], gameboard.board[4], gameboard.board[5]]);
        const row3 = new Set ([gameboard.board[6], gameboard.board[7], gameboard.board[8]]);
        
        const col1 = new Set ([gameboard.board[0], gameboard.board[3], gameboard.board[6]]);
        const col2 = new Set ([gameboard.board[1], gameboard.board[4], gameboard.board[7]]);
        const col3 = new Set ([gameboard.board[2], gameboard.board[5], gameboard.board[8]]);

        const diag1 = new Set ([gameboard.board[0], gameboard.board[4], gameboard.board[8]]);
        const diag2 = new Set ([gameboard.board[2], gameboard.board[4], gameboard.board[7]]);

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

    return { getTurn, getMarker, toggleTurn, isValidMove, checkForWinner };
})();

function player(name) {
    return {
        name: name
    };
}


gameboard.printBoard()

let id = 3;
console.log(game.isValidMove(id));
gameboard.board[id] = game.getMarker();
gameboard.printBoard();
console.log(game.checkForWinner());
game.toggleTurn();

console.log("NEXT TURN--------------");


