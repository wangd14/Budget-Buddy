const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const docs = require("./api/docs");

const org = require("./api/org");
const orguser = require("./api/orguser");
const budget = require("./api/budget");
const receipt = require("./api/receipt");
const transaction = require("./api/transaction");
const invite = require("./api/invite");
const goal = require("./api/goal");
const user = require("./api/user");
const auth = require("./api/auth");

require("dotenv").config();
const MONGO = process.env.MONGO;

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.use("/api", docs);

app.get("/scanner", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "scanner.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "signin.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "signup.html"));
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "welcome.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "profile.html"));
});

app.get("/organization/:oid", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "frontend", "dist", "organization.html")
  );
});

const userSchema = new mongoose.Schema({
  uid: String,
  fname: String,
  lname: String,
  email: String,
  orgs: [Number],
  msgs: [
    {
      title: String,
      text: String,
      time: Number,
      link: String
    }
  ],
  exists: Boolean,
});

const User = mongoose.model("users", userSchema);

const orgSchema = new mongoose.Schema({
  oid: Number,
  orgname: String,
  users: [
    {
      uid: String,
      budgetperms: [Number],
      admin: Number
    }
  ],
  receipts: [
    {
      rid: Number,
      bid: Number,
      location: String,
      total: Number,
      transactions: [Number],
      filepath: String,
      exists: Boolean
    }
  ],
  goals: [
    {
      gid: Number,
      bid: Number,
      name: String,
      amnt: Number,
      total: Number,
      dateCreated: Number,
      dateDue: Number,
      exists: Boolean
    }
  ],
  budgets: [
    {
      bid: Number,
      name: String,
      amnt: Number,
      total: Number,
      dateCreated: Number,
      duration: Number,
      continuous: Number,
      transactions: [Number],
      goals: [Number],
      receipts: [Number],
      exists: Boolean
    }
  ],
  transactions: [
    {
      tid: Number,
      bid: Number,
      rid: Number,
      item: String,
      unitprice: Number,
      qty: Number,
      dateCreated: Number,
      exists: Boolean
    }
  ],
  exists: Boolean,
});

const Org = mongoose.model("Org", orgSchema);

const inviteSchema = new mongoose.Schema({
  inviterUid: String,
  invitedUid: String,
  oid: Number,
  timestamp: Number
});

const Invite = mongoose.model("Invite", inviteSchema);

mongoose.connect(MONGO);

app.use("/org", function (req, res, next) {req.org = Org; req.user = User; next()}, org);
app.use("/org/:oid/user", function (req, res, next) {req.org = Org; req.user = User; req.oid = req.params.oid; next()}, orguser);
app.use("/org/:oid/budget", function (req, res, next) {req.org = Org; req.oid = req.params.oid; next()}, budget);
app.use("/org/:oid/receipt", function (req, res, next) {req.org = Org; req.oid = req.params.oid; next()}, receipt);
app.use("/org/:oid/transaction", function (req, res, next) {req.org = Org; req.oid = req.params.oid; next()}, transaction);
app.use("/org/:oid/goal", function (req, res, next) {req.org = Org; req.oid = req.params.oid; next()}, goal);
app.use("/org/:oid/invite/:email", function (req, res, next) {req.org = Org; req.user = User; req.invite = Invite; req.oid = req.params.oid; next()}, invite);
app.use("/user", function (req, res, next) { req.user = User; next() }, user);
app.use("/auth", function (req, res, next) { req.user = User; next() }, auth);

app.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
