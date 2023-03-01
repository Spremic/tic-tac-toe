let openSearch = document.querySelector(".divSearch i");
let searchInput = document.querySelector("#search");
let writeUsers = document.querySelector(".allUsers");
let jwtEmail = document.querySelector(".jwtEmail");
let token = localStorage.getItem("token");

const socket = io.connect("http://localhost:3000");

//------------------ load token--------------

window.addEventListener("load", dynamicLoad);
async function dynamicLoad(e) {
  e.preventDefault();

  const result = await fetch("./api/dynamicLoad", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((response) => response.json());
  if (result.status === "ok") {
    writeUserName(result);
    writeFriends(result);
    requestFriends(result);
    sendFriends(result);
    allUsers(result);
  }
}

//------------function that writes the username of the user----------
function writeUserName(result) {
  let userName = result.name;
  let email = result.email;
  let writeUserName = document.querySelector("#userName");
  writeUserName.innerHTML = userName;
  jwtEmail.innerHTML = email;
}

//---------------function that lists all friends----------------
async function writeFriends(e) {
  let friend = e.friends;

  let writeallFriends = document.querySelector(".allFriends");

  for (let friends of friend) {
    const resultFriends = await fetch("/api/loadFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friends,
      }),
    }).then((response) => response.json());

    if (resultFriends.status === "ok") {
      let nameFriend = resultFriends.name;
      let email = resultFriends.email;
      console.log(email);

      writeallFriends.innerHTML += ` <div class="user userDesing">
      <div class="freindsIMG">
        <img src="149071.png" alt="friend img" />
      </div>
      <div class="userNameDiv">
        <p class="pUserName">${nameFriend}</p>
        <p class="userEmail">${email} </p>
      </div>
      <div class="divStatus">
        <p class="status">Offline</p>
      </div>
      <div class="divChallange">
        <button class="challange">Chalange!</button>
      </div>
    </div>`;
    }
  }
  if (writeallFriends.innerHTML === "") {
    writeallFriends.innerHTML = `<p class="emptyMessage">You have no friends</p>`;
  }
}

//-------------- function that write request for friends-------------
async function requestFriends(e) {
  let requests = e.requestFriends;
  let write = document.querySelector(".friendsRequestLoad");
  for (let request of requests) {
    const result = await fetch("/api/allRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request,
      }),
    }).then((response) => response.json());
    if (result.status === "ok") {
      console.log(result.name);

      write.innerHTML += `<div class="divRequest userDesing">
      <div class="freindsIMG">
        <img src="149071.png" alt="friend img" />
      </div>
      <div class="userNameDiv">
        <p class="pUserName">${result.name}</p>
        <p class = "userEmail">${result.email} </p>
      </div>
      <div class="divStatus">
        <p class="status">Pennding</p>
      </div>
      <div class="require">
        <button class="accept">Accept</button>
        <button class="delete">Delete</button>
      </div>
    </div>`;
    }
  }
  if (write.innerHTML === "") {
    write.innerHTML = `<p class="emptyMessage">You have no friend request</p>`;
  }
}

//-------function that write sent for request---------------------

async function sendFriends(e) {
  let eSend = e.sendRequest;
  let write = document.querySelector(".friendsSendLoad");

  for (let send of eSend) {
    const result = await fetch("/api/allSent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        send,
      }),
    }).then((response) => response.json());
    if (result.status === "ok") {
      console.log(result.name);

      write.innerHTML += `<div class="user1 divRequest userDesing">
      <div class="freindsIMG">
        <img src="149071.png" alt="friend img" />
      </div>
      <div class="userNameDiv">
        <p class="pUserName">${result.name}</p>
        <p class = "userEmail">${result.email} </p>
      </div>
      <div class="divStatus">
        <p class="status">Pennding</p>
      </div>
      <div class="require">
        <button class="deleteSend">Delete</button>
      </div>
    </div> `;
    }
  }
  if (write.innerHTML === "") {
    write.innerHTML = `<p class="emptyMessage">You have not sent a request to anyone</p>`;
  }
}

// -----------function that writes all users in search-------------
async function allUsers(e) {
  const allUsers = await fetch("/api/allNames", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  // convert object to string
  const allNames = allUsers.allUser.map((user) => user.name);
  const allEmails = allUsers.allEmail.map((mail) => mail.email);
  for (let i = 0; i < allNames.length; i++) {
    writeUsers.innerHTML += `<div class="users">
    <p class="usersName">${allNames[i]}</p>
    <p class="userEmail">${allEmails[i]}</p>
    <button class="sendRequest">Add</button>
    </div>`;
  }
}

// ----------------function that accept and delete request friends----------------
const parentElementBTN = document.querySelector(".friendsRequestLoad");
parentElementBTN.addEventListener("click", async (event) => {
  let target = event.target;
  let targetParentBTN = target.parentElement;
  let parent = targetParentBTN.parentElement;
  let email = parent.querySelector(".userEmail").innerHTML;
  if (target.classList.contains("accept")) {
    const fetchToken = await fetch("./api/dynamicLoad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }).then((response) => response.json());
    if (fetchToken.status === "ok") {
      let acceptUser = fetchToken.email;
      acceptFunction(email.trim(), acceptUser.trim());
    }
  }

  //delete
  if (target.classList.contains("delete")) {
    const fetchToken = await fetch("./api/dynamicLoad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }).then((response) => response.json());
    if (fetchToken.status === "ok") {
      let acceptUser = fetchToken.email;
      deleteUser(email.trim(), acceptUser.trim());
    }
  }
});

//acept
async function acceptFunction(email, acceptUser) {
  const result = await fetch("./api/accept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acceptUser,
      email,
    }),
  }).then((response) => response.json());
  if (result.status === "ok") {
    alert("dodao si");
  }
}

//delete request
async function deleteUser(email, acceptUser) {
  const result = await fetch("./api/deleteReq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acceptUser,
      email,
    }),
  }).then((response) => response.json());
  if (result.status === "ok") {
    alert("dodao si");
  }
}

//--------------functtion unsedn send request-------------
const sendParentBTN = document.querySelector(".friendsSendLoad");
sendParentBTN.addEventListener("click", async (event) => {
  let target = event.target;
  let targetParentBTN = target.parentElement;
  let parent = targetParentBTN.parentElement;
  let email = parent.querySelector(".userEmail").innerHTML;
  if (target.classList.contains("deleteSend")) {
    const fetchToken = await fetch("./api/dynamicLoad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }).then((response) => response.json());
    if (fetchToken.status === "ok") {
      let acceptUser = fetchToken.email;
      unsend(email.trim(), acceptUser.trim());
    }
  }
});

async function unsend(email, acceptUser) {
  const result = await fetch("./api/unsend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acceptUser,
      email,
    }),
  }).then((response) => response.json());
  if (result.status === "ok") {
    alert("unsend succesfuly");
  }
}

//functions that adds friends with btn
const parentElement = document.querySelector(".allUsers");
parentElement.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("sendRequest")) {
    let btnParent = target.parentNode;
    let findEmail = btnParent.querySelector(".userEmail").innerHTML;
    dynmicLoadLoginUser(findEmail);
  }
});

//send file to "sendRequest"
async function dynmicLoadLoginUser(e) {
  const fetchToken = await fetch("./api/dynamicLoad", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((response) => response.json());
  if (fetchToken.status === "ok") {
    let sendRequestUser = fetchToken.email;
    let emailSend = e;
    console.log(sendRequestUser);
    sendRequest(sendRequestUser, emailSend);
  }
}

async function sendRequest(sendRequestUser, emailSend) {
  const send = await fetch("/api/sendRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sendRequestUser,
      emailSend,
    }),
  }).then((response) => response.json());
  if (send.status === "ok") {
    alert("Dodali ste prijatelja");
  }
  if (send.status === "error") {
    alert(send.message);
  }
}

searchInput.addEventListener("keyup", searchFunction);
function searchFunction() {
  let e = searchInput.value.toLowerCase();
  let collection = document.getElementsByClassName("usersName");
  let div = document.querySelectorAll(".users");
  for (i = 0; i < collection.length; i++) {
    if (collection[i].innerHTML.toLowerCase().indexOf(e) > -1 && e !== "") {
      div[i].style.display = "block";
    } else {
      div[i].style.display = "none";
    }
  }
}

//chalange
//player 1 je onaj igrac koji izaziva
//player 2 je onaj igrac koji je izazvan
let friendContainer = document.querySelector(".allFriends");
friendContainer.addEventListener("click", challenge);
async function challenge(e) {
  let target = e.target;
  if (target.classList.contains("challange")) {
    let parent = target.parentNode;
    let parentParent = parent.parentNode;
    let player2 = parentParent.querySelector(".userEmail").innerHTML;

    let player1 = jwtEmail.innerHTML;
    sendChalange(player1, player2.trim());
  }
}

//ako je plejer test plejer 2 jednak sa plejer 2 ti uradi tjj prosledi mu ALERt

let acceptChalangeContainer = document.querySelector(".acceptChalange");
async function sendChalange(player1, player2) {
  let testPlayer2 = jwtEmail.innerHTML;
  socket.emit("new_challangeCL", {
    izazivac: player1,
    player: player2,
    poruka: "Izazvao Vas je:",
  });
  socket.on("new_challangeSR", (data) => {
    if (data.player === testPlayer2) {
      // alert(`${data.poruka} ${data.chalenger}`);
      acceptChalangeContainer.innerHTML = `<div class="acceptChalangeContainer">
      <div class="chalangeIMG">
        <img src="149071.png" alt="SLika izazivaca" />
      </div>
      <div class="nameChallenger">
        <div class="name">
          <p>${data.poruka} ${data.chalenger} </p>
          <p class="userEmail">pero</p>
        </div>
      </div>
      <div class="flexContainer">
        <button class="acceptChalangeBTN">Accept</button>
        <button class="deleteChalangeBTN">Reject</button>
      </div>
    </div>
      `;
    }
  });
}

//accept and reject
acceptChalangeContainer.addEventListener("click", (e) => {
  let event = e.target;

  //accept
  if (event.classList.contains("acceptChalangeBTN")) {
    location.href = "/game";
  }

  //reject
  if (event.classList.contains("deleteChalangeBTN")) {
    let deleteDiv = document.querySelector(".acceptChalangeContainer");
    deleteDiv.remove();
  }
});

//----------------------openSearch--------------
if (openSearch) {
  const toggleSearchInputStyle = () => {
    searchInput.style.display =
      searchInput.style.display === "none" ? "grid" : "none";
  };
  openSearch.addEventListener("click", toggleSearchInputStyle);
  searchInput.style.display = "none";
}
