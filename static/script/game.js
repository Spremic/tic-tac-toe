let container = document.querySelector("#container");
let input = document.querySelectorAll(".edit");
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
let score1 = document.querySelector(".player1Score");
let score2 = document.querySelector(".player2Score");
let loadPlayer1 = document.querySelector(".playerLoad1 p");
let loadPlayer2 = document.querySelector(".playerLoad2 p");
let displayAdd = document.querySelector("#addPlayer");
let displayxo = document.querySelector("#parentContainer");
let form = document.querySelector("form");
let player1Count = 0;
let player2Count = 0;
let xoCounter = 0;

//validation token

// window.addEventListener("load", () => {
//   if (localStorage.getItem("token")) {
//     displayAdd.style.display = "none";
//     displayxo.style.display = "block";
//   } else {
//     displayxo.style.display = "none";
//     displayAdd.style.display = "block";
//   }
// });

//load player
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let move = document.querySelector(".move");

  let player1ToDisplay = player1.value;
  let player2ToDisplay = player2.value;
  move.innerHTML = `Its your tourn ${player1ToDisplay}`;
  loadPlayer1.innerHTML = player1ToDisplay;
  loadPlayer2.innerHTML = player2ToDisplay;
  displayAdd.style.display = "none";
  displayxo.style.display = "block";
});

function counterLoad(p1count, p2cont) {
  score1.innerHTML = p1count;
  score2.innerHTML = p2cont;
}

input.forEach((element) => {
  element.addEventListener("click", (e) => {
    let target = e.target;
    let move = document.querySelector(".move");
    let player1HTML = loadPlayer1.innerHTML;
    let player2HTML = loadPlayer2.innerHTML;
    if (target.innerHTML === "" && xoCounter === 0) {
      target.style.color = "#FF6347";
      target.innerHTML = "X";
      move.innerHTML = `It's your turn ${player2HTML}`;
      xoCounter = 1;
    }
    if (target.innerHTML === "" && xoCounter === 1) {
      target.style.color = "black";
      target.innerHTML = "O";
      xoCounter = 0;
      move.innerHTML = `It's your turn ${player1HTML}`;
    }
    winValidate(player1HTML, player2HTML);
  });
});

function winValidate(player1HTML, player2HTML) {
  let winDisplay = document.querySelector(".win");

  // first column validatiion
  if (
    input[0].innerHTML === "X" &&
    input[1].innerHTML === "X" &&
    input[2].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    clearInput();
    winDisplay.innerHTML = `last round winner ${player1HTML}`;
  }

  if (
    input[0].innerHTML === "O" &&
    input[1].innerHTML === "O" &&
    input[2].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    clearInput();
    winDisplay.innerHTML = `last round winner ${player2HTML}`;
  }

  //2 column validation
  if (
    input[3].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[5].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player1HTML}`;
    clearInput();
  }

  if (
    input[3].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[5].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player2HTML}`;
    clearInput();
  }

  // 3 column validation
  if (
    input[6].innerHTML === "X" &&
    input[7].innerHTML === "X" &&
    input[8].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player1HTML}`;
    clearInput();
  }
  if (
    input[6].innerHTML === "O" &&
    input[7].innerHTML === "O" &&
    input[8].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player2HTML}`;
    clearInput();
  }

  //left vertical
  if (
    input[0].innerHTML === "X" &&
    input[3].innerHTML === "X" &&
    input[6].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player1HTML}`;
    clearInput();
  }

  if (
    input[0].innerHTML === "O" &&
    input[3].innerHTML === "O" &&
    input[6].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = ` last round winner ${player2HTML}`;
    clearInput();
  }

  //center vertical
  if (
    input[1].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[7].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player1HTML}`;
    clearInput();
  }

  if (
    input[1].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[7].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player2HTML}`;
    clearInput();
  }

  //left vertical
  if (
    input[2].innerHTML === "X" &&
    input[5].innerHTML === "X" &&
    input[8].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player1HTML}`;
    clearInput();
  }

  if (
    input[2].innerHTML === "O" &&
    input[5].innerHTML === "O" &&
    input[8].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player2HTML}`;
    clearInput();
  }

  if (
    input[0].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[8].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = ` last round winner ${player1HTML}`;
    clearInput();
  }

  if (
    input[0].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[8].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = ` last round winner ${player2HTML}`;
    clearInput();
  }

  //from the right side to the left diagonal line
  if (
    input[2].innerHTML === "X" &&
    input[4].innerHTML === "X" &&
    input[6].innerHTML === "X"
  ) {
    player1Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = ` last round winner ${player1HTML}`;
    clearInput();
  }
  if (
    input[2].innerHTML === "O" &&
    input[4].innerHTML === "O" &&
    input[6].innerHTML === "O"
  ) {
    player2Count++;
    counterLoad(player1Count, player2Count);
    winDisplay.innerHTML = `last round winner ${player2HTML}`;
    clearInput();
  }
  remiClear(winDisplay);
}

function remiClear(winDisplay) {
  let allFilled = true;
  for (let i = 0; i < input.length; i++) {
    if (input[i].innerHTML === "") {
      allFilled = false;
    }
  }
  if (allFilled) {
    winDisplay.innerHTML = "last rony winner: Remy";
    clearInput();
  }
}

function clearInput() {
  for (let i = 0; i < input.length; i++) {
    input[i].innerHTML = "";
  }
}
