// マスを取得
// const field = document.getElementsByClassName("field");
// for (let i = 0; i < field.length; i++) {
//     console.log(field[i]);
// }
const field = document.querySelectorAll(".field")

// マスの初期値をnullに指定
let board = Array(9).fill(null);
// 現在のプレイヤー（1: プレイヤー1, 2: プレイヤー2）
let currentPlayer = 1;

init();
function init() {
// 各セルにクリックイベントを設定
// forEachによる繰り返し処理で実装
    field.forEach((element, index) => {
        element.addEventListener('click', () => handleClick(index));
    });
}

function handleClick(index) {
    // セルが既に埋まってる場合は無視する
    if (board[index] !== null) {
        return;
    }
    // 現在のプレイヤーのマークをセルに反映
    board[index] = currentPlayer;
    field[index].style.backgroundColor = currentPlayer === 1 ? "pink" : "skyblue";

    // 勝敗判定
    if (checkWinner()) {
        alert(`Player ${currentPlayer} is win!`);
        return;
    }
    
    // 引き分け判定
    if (board.every(element => element !== null)) {
        alert('Draw');
        return;
    }
    
    // ターン切り替え
    currentPlayer = currentPlayer === 1 ? 2 : 1;
};

// 勝敗の判定処理
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
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
