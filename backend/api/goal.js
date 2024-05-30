const express = require('express');
const app = express.Router();

/*
============ 
/org/:oid/goal
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
      let out;
      if (data && data.goals){
        out = data.goals//.map(({gid, name}) => ({gid, name}));
      }

      if (!out) {
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
});

app.post('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;
  const name = req.body.name;
  const total = req.body.total;
  const dateDue = req.body.dateDue;
  const bid = req.body.bid;
  const date = new Date(dateDue);

  if (!token)  {
    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    
  } else if (!name || !total || !dateDue) {
    res.send({"message": "Missing parameters", "data": {
      "message": "The server processed the following data",
      "name": name,
      "total": total,
      "dateDue": dateDue,
    }});
    res.status(400);
  } else {
    try {

      const lenData = await Org.find({ "oid": oid });
      const goal = {
        "gid": lenData[0].goals.length,
        "bid": bid,
        "name": name,
        "amnt": 0,
        "total": total,
        "datecreated": new Date().getTime(),
        "dateDue": date,
        "exists": 1
      };
      await Org.findOneAndUpdate(
        { "oid": oid },
        { $push: { "goals": goal } }
      );
      res.send({"message":"Goal sucessfully created", "data": goal})
      res.status(201);
    } catch (err) {

      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
});

app.put('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const token = req.query.token;
  const name = req.body.name;
  const amnt = req.body.amnt;
  const total = req.body.total;
  const dateDue = req.body.dateDue;
  const bid = req.body.bid;
  const newDateDue = new Date(dateDue);

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.find({ "oid": oid })
      const goals = data[0].goals;

      for (let i = 0; i < goals.length; i++) {
        if (goals[i].exists) {
          const tempBid = goals[i].bid;
          await Org.updateOne(
            { "oid": oid, "budgets.bid": tempBid }, 
            {
              $pull :{
                "budgets.$.goals": goals[i].gid
              }
            }
          )
        }
      }

      await Org.findOneAndUpdate(
        { "oid": oid },
        { 
          $set: { 
            "goals.$[].name": name,
            "goals.$[].amnt": amnt,
            "goals.$[].total": total,
            "goals.$[].dateDue": newDateDue,
            "goals.$[].bid": bid
          }
        }
      );

      for (let i = 0; i < goals.length; i++) {
        if (goals[i].exists) {
          await Org.findOneAndUpdate(
            { "oid": oid, "budgets.bid": bid }, 
            {
              $push :{
                "budgets.$.goals": goals[i].id
              }
            }
          )
        }
      }

      res.send({"message": "Update successful"});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
});

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
      const goals = data[0].goals;

      for (let i = 0; i < goals.length; i++) {
        if (goals[i].exists == 1) {
          const bid = goals[i].bid;
          const gid = goals[i].gid;
          await Org.findOneAndUpate(
            { "oid": oid, "bid": bid }, 
            {
              $pull :{
                "budgets.$.goals": { gid }
              }
            }
          )
        }
      }

      await Org.updateOne(
        { "oid": oid },
        { "goals": [] }
      );

      res.send({"message": "Delete successful"});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

/*
============ 
/org/:oid/goal/:gid
============
*/

app.get('/:gid', async (req, res) => {
  const token = req.query.token;
  const oid = req.oid;
  const gid = req.params.gid;
  const Org = req.org;

  if (!token) {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.find({ "oid": oid });
      const out = data[0].goals.find(obj => obj.gid == gid);

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

app.post('/:gid', (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({"Message":"Method Not Allowed"});
})

app.put('/:gid', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const gid = req.params.gid;
  const token = req.query.token;
  const name = req.body.name;
  const amnt = req.body.amnt;
  const total = req.body.total;
  const dateDue = req.body.dateDue;
  const bid = req.body.bid;
  const date = new Date(dateDue);

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.findOne({ "oid": oid })
      const goal = data.goals.find(obj => obj.gid == gid);

      await Org.updateOne(
        { "oid": oid, "budgets.bid": goal.bid }, 
        {
          $pull :{
            "budgets.$.goals": gid 
          }
        }
      );
      
      await Org.updateOne(
        { "oid": oid, "budgets.bid": bid }, 
        {
          $push :{
            "budgets.$.goals": gid
          }
        }
      );

      await Org.updateOne(
        { "oid": oid, "goals.gid": gid },
        { 
          $set: { 
            "goals.$.name": name,
            "goals.$.amnt": amnt,
            "goals.$.total": total,
            "goals.$.dateDue": date,
            "goals.$.bid": bid
          }
        }
      );

      res.send({"message": "Update successful"});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

app.delete('/:gid', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const gid = req.params.gid;
  const token = req.query.token;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      await Org.findOneAndUpdate(
        { "oid": oid, "goals.gid": gid },
        { 
          $set: { 
            "goals.$.name": null,
            "goals.$.amnt": null,
            "goals.$.total": null,
            "goals.$.dateDue": null,
            "goals.$.bid": null,
            "goals.$.gid": null,
            "goals.$.dateCreated": null,
            "goals.$.exists": false
          }
        }
      );

      res.send({"message": "Update successful"});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

module.exports = app;