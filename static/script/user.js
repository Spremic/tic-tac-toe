let openSearch = document.querySelector(".divSearch i");
let searchInput = document.querySelector("#search");
let writeUsers = document.querySelector(".allUsers");
let token = localStorage.getItem("token");
//----------------------openSearch--------------
openSearch.addEventListener("click", () => {
  if (searchInput.style.display === "none") {
    searchInput.style.display = "grid";
  } else {
    searchInput.style.display = "none";
  }
});

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
    allUsers(result);
    requestFriends(result);
    sendFriends(result);
  }
}

//------------function that writes the username of the user----------
function writeUserName(result) {
  let userName = result.name;
  let writeUserName = document.querySelector("#userName");
  writeUserName.innerHTML = userName;
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
  for (i = 0; i < allNames.length; i++) {
    writeUsers.innerHTML += `<div class="users">
    <p class="usersName">${allNames[i]}</p>
    <p class="userEmail">${allEmails[i]}</p>
    <button class="sendRequest">Add</button>
    </div>`;
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
