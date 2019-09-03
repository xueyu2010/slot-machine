// server entry point and APIs
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

// import Models
const { User, Pull } = require("./sequelize");
const { getSlot, pullSlotMachine } = require("./service/slotMachine");
const { createUser, findUser } = require("./service/users");

app.use("/", router);
app.use(express.static("../public"));

app.all("/*", (req, res, next) => {
  //res.header("X-XSS-Protection", 0);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/*", (req, res, next) => {
  //res.header("X-XSS-Protection", 0);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Grace");
});

app.get("/api/users", (req, res) => {
  findUser(req.query.uniqueIdentifier, req.query.identifierType).then(user => {
    if (!!user) {
      res.json({ result: user, success: true });
    } else {
      req.body = {
        name: "anonymous user",
        identifierType: "cookie"
      };
      createUser(req.body).then(user => {
        res.json({ result: user, success: true });
      });
    }
  });
});

app.post("/api/users", (req, res) =>
  createUser(req.body).then(user => {
    res.json({ result: user, success: true });
  })
);

app.get("/api/slot", (req, res) => {
  getSlot().then(slot => {
    res.json({ result: slot, success: true });
  });
});

// TODO change slotId to not a hardcoded one
app.get("/api/pull", (req, res) => {
  const params = req.query;
  pullSlotMachine(
    params.slotId,
    params.betAmount,
    params.uniqueIdentifier
  ).then(winners => {
    res.json({ result: winners, success: true });
  });
});

app.listen(port, () => console.log(`Slot app listening on port ${port}!`));

// Error handling
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Opps, Something is broken!");
});

module.exports = app;
