const axios = require("axios");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cheerio = require("cheerio");
dotenv.config();

const terminalCtrl = require("./controllers/terminalControllers");
const userCtrl = require("./controllers/userControllers");

const addTerminalValidations = require("./validations/addTerminal");
const registerValidations = require("./validations/register");
const loginValidations = require("./validations/login");
const passport = require("./core/passport");

dotenv.config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/terminals", terminalCtrl.index);
app.post(
  "/terminals",
  passport.authenticate("jwt", { session: false }),
  addTerminalValidations,
  terminalCtrl.create
);
app.delete(
  "/terminals/delete",
  passport.authenticate("jwt", { session: false }),
  terminalCtrl.delete
);

app.get(
  "/users/me",
  passport.authenticate("jwt", { session: false }),
  userCtrl.getUserInfo
);

app.post(
  "/auth/login",
  passport.authenticate("local"),
  loginValidations,
  userCtrl.login
);

app.post(
  "/auth/register",
  passport.authenticate("jwt", { session: false }),
  registerValidations,
  userCtrl.register
);

app.post("/farm", async (req, res) => {
  const { data } = await axios.get(
    `https://pharmgorodok.kz/index.php?tmpl=component&option=com_baza&view=ajaxsearch&do=1&naimenovanie=%D0%BF%D0%B0%D1%80%D0%B0%D1%86%D0%B5%D1%82%D0%B0%D0%BC%D0%BE%D0%BB&apteka=+%D0%A1%D0%B5%D0%BC%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9+%D0%9C%D1%83%D0%BA%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0+&rayon=all`
  );

  const $ = cheerio.load(data, null, false);

  const parsedData = [];

  $("tr.item").each((index, element) => {
    parsedData.push({
      name: $(element).find("p.item-title").text(),
      apteka: $(element).find("a.apteka-map strong").text(),
      address: $(element).find("p.apteka-address strong").text(),
      phone: $(element).find("p.apteka-phone strong").text(),
      workTime: $(element).find("p.apteka-worktime strong").text(),
      price: $(element).find("p.price strong").text(),
      updateTime: $(element).find("p.update-time strong").text(),
    });
  });

  res.status(200).json({
    status: "success",
    messages: JSON.stringify("OK"),
    data: parsedData,
  });
});

app.use("/", express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

io.on("connection", (socket) => {
  let terminalId;

  socket.emit("connected", "Успешное подключение");

  socket.on("TERMINAL-ONLINE", (data) => {
    terminalCtrl.setStatus(data, true);

    terminalId = data;

    socket.emit("TERMINAL-STATUS-CHANGED");

    console.log("Терминал в сети");
  });

  socket.on("disconnect", () => {
    terminalCtrl.setStatus(terminalId, false);

    socket.emit("TERMINAL-STATUS-CHANGED");

    console.log("Терминал отключен");
  });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`Server is run on port ${PORT}`);
});
