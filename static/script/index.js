let container = document.querySelector("#container");
let input = document.querySelectorAll(".edit");
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
let score1 = document.querySelector(".player1Score");
let score2 = document.querySelector(".player2Score");
let form = document.querySelector("form");
let player1Count = 0;
let player2Count = 0;
let xoCounter = 0;

//load player
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let loadPlayer1 = document.querySelector(".playerLoad1 p");
  let loadPlayer2 = document.querySelector(".playerLoad2 p");
  let displayAdd = document.querySelector("#addPlayer");
  let displayxo = document.querySelector("#parentContainer");
  let player1ToDisplay = player1.value;
  let player2ToDisplay = player2.value;
  loadPlayer1.innerHTML = player1ToDisplay;
  loadPlayer2.innerHTML = player2ToDisplay;
  displayAdd.style.display = "none";
  displayxo.style.display = "block";
});

function counterLoad() {
  score1.innerHTML = player1Count;
  score2.innerHTML = player2Count;
}

input.forEach((element) => {
  element.addEventListener("click", (e) => {
    let target = e.target;

    if (target.innerHTML === "" && xoCounter === 0) {
      target.innerHTML = "X";
      xoCounter = 1;
    }
    if (target.innerHTML === "" && xoCounter === 1) {
      target.innerHTML = "O";
      xoCounter = 0;
    }
    winValidate();
  });
});

function winValidate(e) {
  // first column validatiion
  if (
    input[0].innerHTML === "X" &&
    input[1].innerHTML === "X" &&
    input[2].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }

  if (
    input[0].innerHTML === "O" &&
    input[1].innerHTML === "O" &&
    input[2].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  //2 column validation
  if (
    input[3].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[5].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }

  if (
    input[3].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[5].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  // 3 column validation
  if (
    input[6].innerHTML === "X" &&
    input[7].innerHTML === "X" &&
    input[8].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }
  if (
    input[6].innerHTML === "O" &&
    input[7].innerHTML === "O" &&
    input[8].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  //left vertical
  if (
    input[0].innerHTML === "X" &&
    input[3].innerHTML === "X" &&
    input[6].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }

  if (
    input[0].innerHTML === "O" &&
    input[3].innerHTML === "O" &&
    input[6].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  //center vertical
  if (
    input[1].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[7].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }

  if (
    input[1].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[7].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  //left vertical
  if (
    input[2].innerHTML === "X" &&
    input[5].innerHTML === "X" &&
    input[8].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }

  if (
    input[2].innerHTML === "O" &&
    input[5].innerHTML === "O" &&
    input[8].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  if (
    input[0].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[8].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }

  if (
    input[0].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[8].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }

  //from the right side to the left diagonal line
  if (
    input[2].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[6].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count);
    clearInput();
  }
  if (
    input[2].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[6].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player2Count);
    clearInput();
  }
  remiClear();
}
function remiClear() {
  let allFilled = true;
  for (let i = 0; i < input.length; i++) {
    if (input[i].innerHTML === "") {
      allFilled = false;
    }
  }
  if (allFilled) {
    clearInput();
  }
}

function clearInput() {
  for (let i = 0; i < input.length; i++) {
    input[i].innerHTML = "";
  }
}
