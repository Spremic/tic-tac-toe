const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./model/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { updateOne } = require("./model/userSchema.js");

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

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static(__dirname + "/static/css"));
app.use(express.static(__dirname + "/static/script"));
app.use(express.static(__dirname + "/static/img"));
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
const JWT_SECRET = "HASGDHGQWEDQGWEHDAS~!@ew#$#56%$^%yhfgjhjrtrhrhtRHSFSfsdf";
//rout
// app.get("/user", (req, res) => {
//   res.sendFile(path.join(__dirname, "/static/user.html"));
// });
// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "/static/register.html"));
// });
// app.get("/profile", (req, res) => {
//   res.sendFile(path.join(__dirname, "/static/user.html"));
// });

// app.get("/game", (req, res) => {
//   res.sendFile(path.join(__dirname, "/static/game.html"));
// });

//register
app.post("/api/register", async (req, res) => {
  const {
    name,
    email,
    password: plainTextPassword,
    friends,
    requestFriends,
    sendRequest,
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
      sendRequest,
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
        email: emailCheck.email,
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
    const userToken = jwt.verify(token, JWT_SECRET);
    const email = userToken.email;
    let emailCheck = await user.findOne({ email }).lean();
    const id = emailCheck.id;
    const name = emailCheck.name;
    const friends = emailCheck.friends;
    const requestFriends = emailCheck.requestFriends;
    const sendRequest = emailCheck.sendRequest;
    // io.on("connection", (socket) => {
    //   console.log(`Klijent ${name} povezan`);

    //   socket.on("disconnect", () => {
    //     console.log("Klijent je odjavio");
    //   });
    // });
    return res.json({
      status: "ok",
      email,
      id,
      name,
      friends,
      requestFriends,
      sendRequest,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "error" });
  }
});

//load friends
app.post("/api/loadFriends", async (req, res) => {
  const { friends } = req.body;
  const friendData = await user.findOne({ email: friends });
  try {
    const name = friendData.name;
    const email = friendData.email;
    return res.json({ status: "ok", name, email });
  } catch (err) {
    console.log(err);
  }
});

// request friends

app.post("/api/allRequest", async (req, res) => {
  const { request } = req.body;
  const findUser = await user.findOne({ email: request });
  try {
    const email = findUser.email;
    const name = findUser.name;
    return res.json({ status: "ok", email, name });
  } catch (err) {
    console.log(err);
  }
});

//all sent

app.post("/api/allSent", async (req, res) => {
  const { send } = req.body;
  const findUser = await user.findOne({ email: send });
  try {
    const email = findUser.email;
    const name = findUser.name;
    return res.json({ status: "ok", email, name });
  } catch (err) {
    console.log(err);
  }
});

// accept friens
// acceptUser je onaj koji prihvata
// email je onaj kome se prihvata zahtev
app.post("/api/accept", async (req, res) => {
  const { email, acceptUser } = req.body;
  try {
    const result = await user.updateOne(
      { email: acceptUser },
      {
        $push: { friends: email },
        $pull: { requestFriends: email },
      }
    );
    const result2 = await user.updateOne(
      { email: email },
      {
        $push: { friends: acceptUser },
        $pull: { sendRequest: acceptUser },
      }
    );
    return res.json({ status: "ok", acceptUser, email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// delete request friends
app.post("/api/deleteReq", async (req, res) => {
  const { email, acceptUser } = req.body;
  try {
    const result = await user.updateOne(
      { email: acceptUser },
      {
        $pull: { requestFriends: email },
      }
    );
    const result2 = await user.updateOne(
      { email: email },
      {
        $pull: { sendRequest: acceptUser },
      }
    );
    return res.json({ status: "ok", acceptUser, email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

//unsend
//email je onaj kome se prihvata
app.post("/api/unsend", async (req, res) => {
  const { email, acceptUser } = req.body;
  try {
    const result = await user.updateOne(
      { email: acceptUser },
      {
        $pull: { sendRequest: email },
      }
    );
    const result2 = await user.updateOne(
      { email: email },
      {
        $pull: { requestFriends: acceptUser },
      }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

//send all names people to front
app.get("/api/allNames", async (req, res) => {
  try {
    const allUser = await user.find({}, "name");
    const allEmail = await user.find({}, "email");
    return res.json({ status: "ok", allUser, allEmail });
  } catch (err) {
    console.log(err);
  }
});

//function that adds friends with btn
//emailSend je mejl kojem se salje zahtev
//sendRequestUser je mejl koji je ulogovan tj onaj koji salje zahtev
app.post("/api/sendRequest", async (req, res) => {
  const { sendRequestUser, emailSend } = req.body;
  try {
    const currentUser = await user.findOne({ email: sendRequestUser });
    if (currentUser.sendRequest.includes(emailSend)) {
      return res.json({
        status: "error",
        message: "Friend request already sent",
      });
    }

    if (currentUser.requestFriends.includes(emailSend)) {
      return res.json({
        status: "error",
        message: "A user has sent you a friend request",
      });
    }

    if (currentUser.friends.includes(emailSend)) {
      return res.json({
        status: "error",
        message: "you are already friends",
      });
    }
    if (sendRequestUser !== emailSend) {
      await user.updateOne(
        { email: sendRequestUser },
        {
          $push: { sendRequest: emailSend },
        }
      );
      await user.updateOne(
        { email: emailSend },
        {
          $push: { requestFriends: sendRequestUser },
        }
      );

      return res.json({ status: "ok" });
    } else {
      return res.json({
        status: "error",
        message: "You are trying to add yourself as a friend",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

http.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
