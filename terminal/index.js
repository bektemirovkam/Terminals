const io = require("socket.io-client");

const TERMINAL_ID = "605c35fc6db9dc1778aa3571";

// const socket = io("http://localhost:8888");
const socket = io("https://immense-spire-12966.herokuapp.com/");

socket.on("connected", (msg) => {

  socket.emit("TERMINAL-ONLINE", TERMINAL_ID);

  console.log(msg);
});
