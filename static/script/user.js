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
