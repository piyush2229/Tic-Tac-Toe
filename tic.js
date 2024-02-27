let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset");
let newGameBtn = document.getElementById("reset_new");
let msgContainer = document.querySelector(".main-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let moves = 0;
let gameEnded = false;

const winning = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Event listeners for the buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameEnded && box.textContent === "") {
      if (turn0) {
        box.textContent = "O";
        turn0 = false;
      } else {
        box.textContent = "X";
        turn0 = true;
      }
      moves++;
      checkWinner();
    }
  });
});

function checkWinner() {
  for (let pattern of winning) {
    let pos1 = boxes[pattern[0] - 1].textContent;
    let pos2 = boxes[pattern[1] - 1].textContent;
    let pos3 = boxes[pattern[2] - 1].textContent;
    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }
  if (moves === 9) {
    showTie();
  }
}

function showWinner(winner) {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameEnded = true;
  disableBoxes();
}

function showTie() {
  msg.innerText = "It's a tie!";
  msgContainer.classList.remove("hide");
  gameEnded = true;
}

function resetGame() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  turn0 = true;
  moves = 0;
  gameEnded = false;
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}
