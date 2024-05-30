const express = require('express');
const app = express.Router();

/*
============ 
/org/:oid/receipt/:rid
============
*/

app.get('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.findOne({"oid": oid});
      const out = data[0].receipts.map(({rid}) => ({rid}));

      if (!out || out.length == 0) {
        res.send({"message": "Item not found"});
        res.status(404);
      } else {
        res.send({"message": "success", "data": out});
        res.status(200);
      };

    } catch (err) {

      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

app.post('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;
  const location = req.body.location;
  const total = req.body.total;
  const bid = req.body.bid;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else if (!location || !total || !bid) {

    res.send({"message": "Missing parameters", "data": {
      "message": "The server processed the following data",
      "location": location,
      "total": total,
      "bid": bid
    }});
    res.status(400);

  } else {
    try {

      const lenData = await Org.find({ "oid": oid });
      const receipt = {
        "rid": lenData[0].receipts.length,
        "bid": bid,
        "location": location,
        "total": total,
        "transactions": [],
        "filepath": oid + "-" + lenData[0].receipts.length,
        "exists": true
      };
      await Org.updateOne(
        { "oid": oid },
        { $push: { "receipts": receipt } }
      );

      res.send({"message":"Receipt sucessfully created", "data": receipt})
      res.status(201);

    } catch (err) {

      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

app.put('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;
  const location = req.body.location;
  const total = req.body.total;
  const bid = req.body.bid;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.findOne({ "oid": oid })
      const receipts = data[0].receipts;

      for (let i = 0; i < receipts.length; i++) {
        if (receipts[i].exists) {
          const tempBid = receipts[i].bid;
          await Org.updateOne(
            { "oid": oid, "budgets.bid": tempBid }, 
            {
              $pull :{
                "budgets.$.receipts": receipts[i].rid 
              }
            }
          )
        }
      }

      await Org.UpdateOne(
        { "oid": oid },
        { 
          $set: { 
            "receipts.$[].location": location,
            "receipts.$[].total": total,      
            "receipts.$[].bid": bid,   
          }
        }
      );

      for (let i = 0; i < receipts.length; i++) {
        if (receipts[i].exists) {
          await Org.updateOne(
            { "oid": oid, "budgets.bid": bid }, 
            {
              $pull :{
                "budgets.$.receipts": receipts[i].id 
              }
            }
          )
        }
      }
      
      res.send({"message": "Update successful"})
      res.status(204);

    } catch (err) {

      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

app.delete('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.findOne({ "oid": oid })
      const receipts = data[0].receipts;

      for (let i = 0; i < receipts.length; i++) {
        if (receipts[i].exists) {
          const tempBid = receipts[i].bid;
          await Org.updateOne(
            { "oid": oid, "budgets.bid": tempBid }, 
            {
              $pull :{
                "budgets.$.receipts": receipts[i].rid 
              }
            }
          )
        }
      }

      await Org.UpdateOne(
        { "oid": oid },
        { 
          "receipts": []
        }
      );

      res.send({"message": "Update successful"})
      res.status(204);

    } catch (err) {

      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

/*
============ 
/org/:oid/receipt/:rid
============
*/

app.get('/:rid', async (req, res) => {
  const token = req.query.token;
  const oid = req.oid;
  const tid = req.params.tid;
  const Org = req.org;

  if (!token) {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.find({ "oid": oid });
      const out = data[0].transactions.find(obj => obj.tid == tid);

      if (!out || !out.exists) {
        res.send({"message": "Item not found"});
        res.status(404);
      } else {
        res.send({"message": "success", "data": out});
        res.status(200);
      }

    } catch (err) {

      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

app.post('/:rid', (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({"Message":"Method Not Allowed"});
})

app.put('/:rid', (req, res) => {

})

app.delete('/:rid', (req, res) => {

})

module.exports = app;