const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [String],
    requestFriends: [String],
    sendRequest: [String],
    socketId: [String],
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("User", UserSchema);

module.exports = model;

// io.on("connection", (socket) => {
//   // get information from token
//   app.post("/api/sendRequest", async (req, res) => {
//     const { token, name } = req.body;

//     try {
//       const userToken = jwt.verify(token, JWT_SECRET);
//       const email = userToken.email;
//       let emailCheck = await user.findOne({ email }).lean();
//       const id = emailCheck.id;
//       const senderName = emailCheck.name;
//       const friends = emailCheck.friends;

//       // find the friend's socket by name and emit the "send_request" event
//       const friend = friends.find((friend) => friend.name === name);
//       if (friend) {
//         const friendSocket = io.sockets.sockets[friend.socketId];
//         if (friendSocket) {
//           friendSocket.emit("send_request", { senderName, id });
//         }
//       }

//       return res.json({
//         status: "ok",
//       });
//     } catch (err) {
//       console.log(err);
//       res.json({ status: "error", error: "error" });
//     }
//   });
// });

//na frontu mozes kazes ako je ta poruka koja se svima salje, ako je status OK ti emitojees ono ako je ovaj name jednag sa email adresom
