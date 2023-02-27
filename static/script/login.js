let registerBTN = document.querySelector("span");
const forma = document.getElementById("formLogin");

//funkcija koja uloguje korisnika
forma.addEventListener("submit", login);
async function login(e) {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const result = await fetch("./api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());

  if (result.status === "ok") {
    localStorage.setItem("token", result.token);
    document.location = "/profile";
  }
}
