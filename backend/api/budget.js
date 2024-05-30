const express = require("express");
const app = express.Router();

/*
============ 
/org/:oid/budget
============
*/

app.get("/", async (req, res) => {
  const token = req.query.token;
  const oid = req.oid;
  const Org = req.org;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.find({ oid: oid });

      if (!data[0].exists || data[0].budgets.length == 0) {
        res.send({ message: "Item not found" });
        res.status(404);
      } else {
        const out = data[0].budgets.map(({ bid, name, amnt, total }) => ({
          bid,
          name,
          amnt,
          total,
        }));

        if (!out || out.exists) {
          res.send({ message: "Item not found" });
          res.status(404);
        } else {
          res.send({ message: "success", data: out });
          res.status(200);
        }
      }
    } catch (err) {
      res.send({ message: "A server error occured", error: err.message });
      res.status(500);
    }
  }
});

app.post("/", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const name = req.body.name;
  const total = req.body.total;
  const duration = req.body.duration;
  const continuous = req.body.continuous;
  const token = req.query.token;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else if (!name || !total) {
    res.send({
      message: "Missing parameters",
      data: {
        message: "The server processed the following data",
        name: name,
        amnt: 0,
        total: total,
        // duration: duration,
        continuous: continuous,
      },
    });
    res.status(400);
  } else {
    try {
      const lenData = await Org.find({ oid: oid });
      const budget = {
        bid: lenData[0].budgets.length,
        name: name,
        amnt: 0,
        total: total,
        datecreated: new Date().getTime(),
        // duration: duration,
        continuous: continuous,
        transactions: [],
        goals: [],
        recipets: [],
        exists: true,
      };

      const currTotal = lenData[0].budgets[0].total;

      await Org.findOneAndUpdate({ oid: oid }, { $push: { budgets: budget } });
      await Org.findOneAndUpdate(
        { oid: oid, "budgets.bid": 0 },
        { $set: { "budgets.$.total": currTotal + total } }
      );

      res.send({ message: "Budget sucessfully created", data: budget });
      res.status(201);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occurred", error: err.message });
      res.status(500);
    }
  }
});

app.put("/", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const name = req.body.name;
  const amnt = req.body.amnt;
  const duration = req.body.duration;
  const continuous = req.body.continuous;
  const token = req.query.token;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      await Org.findOneAndUpdate(
        { oid: oid },
        {
          $set: {
            "budgets.$[].name": name,
            "budgets.$[].amnt": amnt,
            "budgets.$[].duration": duration,
            "budgets.$[].continuous": continuous,
          },
        }
      );

      res.send({ message: "Update successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occurred", error: err.message });
      res.status(500);
    }
  }
});

app.delete("/", async (req, res) => {
  console.log("im not making this work properly, so use carefully");
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const org = await Org.find({ oid: oid });

      await Org.updateOne({ oid: oid }, { budgets: [] });

      res.send({ message: "Delete successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occurred", error: err.message });
      res.status(500);
    }
  }
});

/*
============ 
/org/:oid/budget/:bid
============
*/

app.get("/:bid", async (req, res) => {
  const token = req.query.token;
  const oid = req.oid;
  const bid = req.params.bid;
  const Org = req.org;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.find({ oid: oid });
      const out = data[0].budgets.find((obj) => obj.bid == bid);

      if (!out || !out.exists) {
        res.send({ message: "Item not found" });
        res.status(404);
      } else {
        res.send({ message: "success", data: out });
        res.status(200);
      }
    } catch (err) {
      res.send({ message: "A server error occured", error: err.message });
      res.status(500);
    }
  }
});

app.post("/:bid", (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({ Message: "Method Not Allowed" });
});

app.put("/:bid", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const bid = req.params.bid;
  const name = req.body.name;
  const amnt = req.body.amnt;
  const duration = req.body.duration;
  const continuous = req.body.continuous;
  const token = req.query.token;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      if (name) {
        await Org.updateOne(
          { oid: oid, "budgets.bid": bid },
          {
            $set: {
              "budgets.$.name": name,
            },
          }
        );
      }
      if (amnt) {
        console.log("updating amnt");
        console.log(bid);
        await Org.updateOne(
          { oid: oid, "budgets.bid": bid },
          {
            $set: {
              "budgets.$.amnt": amnt,
            },
          }
        );
      }
      if (duration) {
        const date = new Date(duration);
        if (date) {
          await Org.updateOne(
            { oid: oid, "budgets.bid": bid },
            {
              $set: {
                "budgets.$.duration": date,
              },
            }
          );
        }
      }
      if (continuous) {
        await Org.updateOne(
          { oid: oid, "budgets.bid": bid },
          {
            $set: {
              "budgets.$.continuous": continuous,
            },
          }
        );
      }

      res.send({ message: "Update successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occurred", error: err.message });
      res.status(500);
    }
  }
});

app.delete("/:bid", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const bid = req.params.bid;
  const token = req.query.token;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      await Org.updateOne(
        { oid: oid, "budgets.bid": bid },
        {
          $set: {
            "budgets.$.name": null,
            "budgets.$.amnt": null,
            "budgets.$.dateCreated": null,
            "budgets.$.duration": null,
            "budgets.$.continuous": null,
            "budgets.$.transactions": [],
            "budgets.$.goals": [],
            "budgets.$.exists": false,
          },
        }
      );

      res.send({ message: "Delete successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occurred", error: err.message });
      res.status(500);
    }
  }
});

module.exports = app;
