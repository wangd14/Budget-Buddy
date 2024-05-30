const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

/*
============ 
/org
============
*/

app.get("/", async (req, res) => {
  const Org = req.org;
  const token = req.query.token;
  let page = req.query.page;
  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    if (!page) page = 0;
    try {
      const data = await Org.find({});
      const out = data.map(({ oid, orgname }) => ({
        oid: oid,
        orgname: orgname,
      }));

      res.send({ message: "Success", data: out });
      res.status(200);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err });
      res.status(500);
    }
  }
});

app.post("/", urlencodedParser, async (req, res) => {
  const Org = req.org;
  const User = req.user;
  const token = req.query.token;
  const name = req.body.orgname;
  const uid = req.body.uid;
  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else if (!name) {
    res.send({
      message: "Missing parameters",
      data: {
        message: "The server processed the following data",
        name: name,
      },
    });
    res.status(400);
  } else {
    try {
      const len = await Org.countDocuments();

      //Update the user's orgs
      await User.findOneAndUpdate({ uid: uid }, { $push: { orgs: `${len}` } });

      //Creates new Org
      const newOrg = new Org({
        oid: len,
        orgname: name,
        users: [{ uid: uid, budgetperms: [-1], admin: 2 }],
        receipts: [],
        goals: [],
        budgets: [
          {
            bid: 0,
            name: "Overall budget",
            amnt: 0,
            total: 0,
            dateCreated: new Date().getTime(),
            transactions: [],
            goals: [],
            receipts: [],
            exists: true,
          },
        ],
        transactions: [],
        exists: true,
      });
      await newOrg.save();

      res.send({
        message: "Organization successfully created",
        data: { oid: len },
      });
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err });
      res.status(500);
    }
  }
});

app.put("/", (req, res) => {
  res.set("Allow", "GET, POST, DELETE");
  res.status(405);
  res.send({ Message: "Method Not Allowed" });
});

app.delete("/", async (req, res) => {
  const Org = req.org;
  const token = req.query.token;
  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      await Org.updateMany(
        {},
        {
          orgname: "",
          users: [],
          receipts: [],
          goals: [],
          budgets: [],
          transactions: [],
          exists: false,
        }
      );

      res.send({
        message: "Organization successfully created",
        data: { oid: len },
      });
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err });
      res.status(500);
    }
  }
});

/*
============ 
/org/:oid
============
*/

app.get("/:oid", async (req, res) => {
  const Org = req.org;
  const token = req.query.token;
  console.log(req.query);
  const id = req.params.oid;
  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.find({ oid: id });

      res.send({ message: "Success", data: data[0] });
      res.status(200);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err });
      res.status(500);
    }
  }
});

app.post("/:oid", (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({ Message: "Method Not Allowed" });
});

app.put("/:oid", urlencodedParser, async (req, res) => {
  const Org = req.org;
  const token = req.query.token;
  const id = req.params.oid;
  const name = req.body.orgname;
  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.find({ oid: id });
      await Org.updateOne(
        { oid: id },
        {
          orgname: name,
        }
      );

      res.send({ message: "Success", data: data });
      res.status(200);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err });
      res.status(500);
    }
  }
});

app.delete("/:oid", async (req, res) => {
  const Org = req.org;
  const User = req.user;
  const token = req.query.token;
  const id = req.params.oid;
  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const docs = await Org.find({ oid: id });

      const userObjs = docs[0].users;

      const usersId = userObjs.map((obj) => obj.uid);

      //For each userId, remove the current oid
      for (let i = 0; i < usersId.length; i++) {
        await User.findOneAndUpdate(
          { uid: usersId[i] },
          {
            $pull: {
              orgs: { $in: [id] },
            },
          }
        );
      }

      //Clears the org data
      await Org.updateOne(
        { oid: id },
        {
          orgname: "",
          oid: null,
          users: [],
          receipts: [],
          goals: [],
          budget: [],
          transactions: [],
          exists: false,
        }
      );

      res.send({ message: "Organization successfully deleted" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err });
      res.status(500);
    }
  }
});

module.exports = app;
