let openSearch = document.querySelector(".divSearch i");
let searchInput = document.querySelector("#search");
let writeUsers = document.querySelector(".allUsers");

//openSearch
openSearch.addEventListener("click", () => {
  if (searchInput.style.display === "none") {
    searchInput.style.display = "grid";
  } else {
    searchInput.style.display = "none";
  }
});

// load token
window.addEventListener("load", dynamicLoad);
async function dynamicLoad(e) {
  e.preventDefault();
  let token = localStorage.getItem("token");

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
  }
}

//function that lists all friends
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
      console.log(nameFriend);

      writeallFriends.innerHTML += ` <div class="user1 userDesing">
      <div class="freindsIMG">
        <img src="149071.png" alt="friend img" />
      </div>
      <div class="userNameDiv">
        <p class="pUserName">${nameFriend}</p>
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
}

//function that writes the username of the user
function writeUserName(result) {
  let userName = result.name;
  let writeUserName = document.querySelector("#userName");
  writeUserName.innerHTML = userName;
}

// function that writes all users in search
async function allUsers(e) {
  const allUsers = await fetch("/api/allNames", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  // convert object to string
  const allNames = allUsers.allUser.map((user) => user.name);
  allNames.forEach((element) => {
    writeUsers.innerHTML += `<div class="users">
    <p class="usersName">${element}</p>
    <p class="userEmail">dspremic1@gmail.com</p>
    </div>`;
  });
}

searchInput.addEventListener("input", searchFunction);
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
