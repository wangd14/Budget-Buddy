const express = require("express");
const app = express.Router();

/*
============ 
/org/:oid/purchase
============
*/

app.get("/", async (req, res) => {
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
      const data = await Org.findOne({ oid: oid });
      const out = data.transactions;

      if (!out) {
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

app.post("/", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;
  const item = req.body.item;
  const qty = req.body.qty;
  const unitprice = req.body.unitprice;
  const bid = req.body.bid;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else if (!item || !qty || !unitprice || !(bid >= 0)) {
    res.send({
      message: "Missing parameters",
      data: {
        message: "The server processed the following data",
        item: item,
        qty: qty,
        unitprice: unitprice,
        bid: bid,
      },
    });
    res.status(400);
  } else {
    try {
      const lenData = await Org.find({ oid: oid });

      await Org.updateOne(
        { oid: oid },
        {
          $push: { "budgets.$[].transactions": lenData[0].transactions.length },
        }
      );

      await Org.updateOne(
        { oid: oid, "budgets.bid": 0 },
        { $inc: { "budgets.$.amnt": qty * unitprice } }
      );

      if (bid != 0) {
        await Org.updateOne(
          { oid: oid, "budgets.bid": bid },
          { $inc: { "budgets.$.amnt": qty * unitprice } }
        );
      }

      const transaction = {
        gid: lenData[0].transactions.length,
        bid: bid,
        item: item,
        qty: qty,
        unitprice: unitprice,
        datecreated: new Date().getTime(),
        exists: true,
      };

      await Org.updateOne(
        { oid: oid },
        { $push: { transactions: transaction } }
      );

      res.send({
        message: "Transaction sucessfully created",
        data: transaction,
      });
      res.status(201);
    } catch (err) {
      res.send({ message: "A server error occured", error: err.message });
      console.log(err);
      res.status(500);
    }
  }
});

app.put("/", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;
  const item = req.body.item;
  const qty = req.body.qty;
  const unitprice = req.body.unitprice;
  const bid = req.body.bid;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.findOne({ oid: oid });
      const transactions = data[0].transactions;

      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].exists) {
          const tempBid = transactions[i].bid;
          await Org.updateOne(
            { oid: oid, "budgets.bid": tempBid },
            {
              $pull: {
                "budgets.$.transactions": transactions[i].tid,
              },
            }
          );
        }
      }

      await Org.UpdateOne(
        { oid: oid },
        {
          $set: {
            "transactions.$[].bid": bid,
            "transactions.$[].item": item,
            "transactions.$[].qty": qty,
            "transactions.$[].unitprice": unitprice,
          },
        }
      );

      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].exists) {
          await Org.updateOne(
            { oid: oid, "budgets.bid": bid },
            {
              $push: {
                "budgets.$.transactions": transactions[i].id,
              },
            }
          );
        }
      }

      res.send({ message: "Update successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err.message });
      res.status(500);
    }
  }
});

app.delete("/", async (req, res) => {
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
      const data = await Org.findOne({ oid: oid });
      const transactions = data[0].transactions;

      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].exists) {
          const tempBid = transactions[i].bid;
          await Org.updateOne(
            { oid: oid, "budgets.bid": tempBid },
            {
              $pull: {
                "budgets.$.transactions": transactions[i].tid,
              },
            }
          );
        }
      }

      await Org.UpdateOne({ oid: oid }, { transactions: [] });

      res.send({ message: "Update successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err.message });
      res.status(500);
    }
  }
});

/*
============ 
/org/:oid/purchase/:pid
============
*/

app.get("/:tid", async (req, res) => {
  const token = req.query.token;
  const oid = req.oid;
  const tid = req.params.tid;
  const Org = req.org;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.find({ oid: oid });
      const out = data[0].transactions.find((obj) => obj.tid == tid);

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

app.post("/:tid", async (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({ Message: "Method Not Allowed" });
});

app.put("/:tid", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const tid = req.params.tid;
  const token = req.query.token;
  const item = req.body.item;
  const qty = req.body.qty;
  const unitprice = req.body.unitprice;
  const bid = req.body.bid;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.findOne({ oid: oid });
      const transaction = data[0].transactions.find((obj) => obj.tid == tid);

      await Org.UpdateOne(
        { oid: oid, transaction: transaction.bid },
        {
          $pull: {
            "budgets.$.transactions": tid,
          },
        }
      );

      await Org.updateOne(
        { oid: oid, "budgets.bid": bid },
        {
          $push: {
            "budgets.$.transactions": tid,
          },
        }
      );

      await Org.updateOne(
        { oid: oid, "transactions.tid": tid },
        {
          $set: {
            "transactions.$.item": item,
            "transactions.$.unitprice": unitprice,
            "transactions.$.qty": qty,
            "transactions.$.bid": bid,
          },
        }
      );

      res.send({ message: "Update successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err.message });
      res.status(500);
    }
  }
});

app.delete("/:tid", async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const tid = req.params.tid;
  const token = req.query.token;

  if (!token) {
    res.send({
      message: "You do not have permission to access this resources",
    });
    res.status(401);
  } else {
    try {
      const data = await Org.findOne({ oid: oid });
      const transaction = data[0].transactions.find((obj) => obj.tid == tid);

      await Org.UpdateOne(
        { oid: oid, transaction: transaction.bid },
        {
          $pull: {
            "budgets.$.transactions": tid,
          },
        }
      );

      await Org.updateOne(
        { oid: oid, "transactions.tid": tid },
        {
          $set: {
            "transactions.$.item": null,
            "transactions.$.unitprice": null,
            "transactions.$.qty": null,
            "transactions.$.bid": null,
            "transactions.$.tid": null,
            "transactions.$.dateCreated": null,
            exists: false,
          },
        }
      );

      res.send({ message: "Update successful" });
      res.status(204);
    } catch (err) {
      console.log(err);
      res.send({ message: "A server error occured", error: err.message });
      res.status(500);
    }
  }
});

module.exports = app;
