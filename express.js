const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./model/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

const url = `mongodb+srv://spremic:H3bLeFK9VSGR82bA@cluster0.zigapfi.mongodb.net/?retryWrites=true&w=majorit`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: "majority",
};
mongoose.set("strictQuery", false);
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

const JWT_SECRET = "HASGDHGQWEDQGWEHDAS~!@ew#$#56%$^%yhfgjhjrtrhrhtRHSFSfsdf";

const app = express();
app.use(express.static(__dirname + "/static/css"));
app.use(express.static(__dirname + "/static/script"));
app.use(express.static(__dirname + "/static/img"));
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
//register
app.post("/api/register", async (req, res) => {
  const {
    name,
    email,
    password: plainTextPassword,
    friends,
    requestFriends,
  } = req.body;

  let emailCheck = await user.findOne({ email }).lean();
  if (emailCheck) {
    return res.json({ status: "email", email: "Email is use!" });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await user.create({
      name,
      email,
      password,
      friends,
      requestFriends,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  res.json({ status: "ok" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  //email validacija
  let emailCheck = await user.findOne({ email }).lean();
  if (!emailCheck) {
    return res.json({ status: "mail", mail: "Nepostojeca email adresa" });
  }

  if (await bcrypt.compare(password, emailCheck.password)) {
    const token = jwt.sign(
      {
        id: emailCheck._id,
        name: emailCheck.name,
        email: emailCheck.email,
        friends: emailCheck.friends,
        requestFriends: emailCheck.requestFriends,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", token: token });
  } else {
    return res.json({ status: "password", password: "Pogresna sifra" });
  }
});

// get information from token
app.post("/api/dynamicLoad", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const email = user.email;
    const id = user.id;
    const name = user.name;
    const friends = user.friends;
    const requestFriends = user.requestFriends;
    return res.json({ status: "ok", email, id, name, friends, requestFriends });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "error" });
  }
});

//loda friends

app.post("/api/loadFriends", async (req, res) => {
  const { friends } = req.body;
  const friendData = await user.findOne({ email: friends});
  try {
    const name = friendData.name;
    return res.json({ status: "ok", name });
  } catch (err) {
    console.log(err);
  }
});
