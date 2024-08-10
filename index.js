const boxes = document.querySelectorAll(".box");
const newGameButton = document.getElementById("newGameButton");
const messageContainer = document.getElementById("messageContainer");
const winnerMessage = document.getElementById("winnerMessage");
const resetButton = document.getElementById("resetButton");

let isTurnO = true;
const winningPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8],
];

const resetGame = () => {
    isTurnO = true;
    enableBoxes();
    messageContainer.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const boxA = boxes[a].innerText;
        const boxB = boxes[b].innerText;
        const boxC = boxes[c].innerText;

        if (boxA && boxA === boxB && boxA === boxC) {
            announceWinner(boxA);
            return;
        }
    }
    checkDraw();
};

const checkDraw = () => {
    if ([...boxes].every(box => box.innerText !== "")) {
        announceWinner("Draw");
    }
};

const announceWinner = (winner) => {
    winnerMessage.innerText = winner === "Draw" ? "It's a Draw!" : `Congratulations! ${winner} Wins!`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

document.getElementById("gameBoard").addEventListener("click", (event) => {
    if (event.target.classList.contains("box") && !event.target.innerText) {
        event.target.innerText = isTurnO ? "O" : "X";
        isTurnO = !isTurnO;
        checkWinner();
    }
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
