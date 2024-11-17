let field = document.querySelectorAll(".field");
let board = Array(9).fill(null); // 初期値をnullに指定
let currentPlayer = 1; // 現在のプレイヤー（1: プレイヤー1, 2: プレイヤー2）

init();
function init() {
    // 各セルにクリックイベントを設定
    field.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });
}

function handleClick(index) {
    // セルが既に埋まってる場合は無視する
    if (board[index] !== null) {
        return;
    }

    // 現在のプレイヤーのマークをセルに反映
    board[index] = currentPlayer;
    field[index].style.backgroundColor = currentPlayer === 1 ? 'pink' : 'skyblue';

    // 勝敗判定
    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
        return;
    }

    // 引き分け判定
    if (board.every(cell => cell !== null)) {// everyメソッドの引数cellがどこから来たかわかってない
        alert("Draw!");
        resetGame();
        return;
    }

    // ターン切り替え
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// 勝敗の判定処理
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [4, 5, 6],
        [7, 8, 9],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    // 勝利条件をチェック
    return winPatterns.some(combination => {
        const [a, b, c] = combination;
        return (
            board[a] !== null &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    })
}

function resetGame() {
    board.fill(null);
    field.forEach((cell) => {
        cell.style.backgroundColor = "";
    });
    currentPlayer = 1;
}
