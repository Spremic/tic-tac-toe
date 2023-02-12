let loginBTN = document.querySelector("span");
const forma = document.getElementById("formRegister");

//register user funciont
forma.addEventListener("submit", registerUser);
async function registerUser(e) {
  e.preventDefault();
  const name = document.querySelector("#nameRegister").value;
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;

  const result = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((response) => response.json());
  if (result.status === "email") {
    alert(result.email);
  }
}
