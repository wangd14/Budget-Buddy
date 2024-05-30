const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

/*
============ 
/org/:oid/user
============
*/

app.get('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;

  try {

    const data = await Org.find({"oid": oid});
    const userData = data[0].users.map(({uid}) => ({uid}));

    res.send({"message": "Success", "data": userData});
    res.status(200);

  } catch (err) {
    
    console.log(err);
    res.send({"message": "A server error occured", "error": err.message})
    res.status(500);

  }
})

app.post('/', async (req, res) => {
  const Org = req.org;
  const User = req.user;
  const oid = req.oid;
  const uid = req.body.uid;
  const perms = req.body.perms;
  const admin = req.body.admin;
  const token = req.query.token;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else if (!perms || !admin) {

    res.send({"message": "Missing parameters", "data": {
      "message": "The server processed the following data",
      "perms": perms,
      "admin": admin
    }});
    res.status(400);

  } else {

    try {

      await Org.updateOne({"oid": oid}, {
        $push: {users: {
          "uid": uid,
          "budgetperms": perms,
          "admin": admin
        }}
      });

      await User.updateOne(
        {"uid": uid},
        { $push: {
            "orgs": oid
          }
        }
      );

      res.send({"message": "User added successfully"});
      res.status(201);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err});
      res.status(500);
    }
  }

})

app.put('/', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const perms = req.body.perms;
  const admin = req.body.admin;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {
      const data = await Org.findOneAndUpdate(
        {"oid": oid}, 
        {
          $set: {users: {
            "users.$[].budgetperms": perms,
            "users.$[].admin": admin
          }}
        }
      );

      res.send({"message": "User added successfully", "data": data});
      res.status(201);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
});

app.delete('/', async (req, res) => {
  const Org = req.org;
  const User = req.user;
  const oid = req.oid;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      const data = await Org.findOne(
        {"oid": oid},
      );
      const users = data[0].users;

      for (let i = 0; i < users.length; i++) {
        await User.updateOne(
          {"uid": users[i].uid},
          { $pull : {
              "orgs": oid
            }
          }
        )
      };

      await Org.updateOne(
        {"oid": oid}, 
        {
          users: []
        }
      );

      res.send({"message": "User added deleted"});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
});

/*
============ 
/org/:oid/user/:uid
============
*/

app.get('/:uid', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const uid = req.params.uid;
  try {

    const data = await Org.find({"oid": oid,});
    const userData = data[0].users.find(obj => obj.uid == uid);

    res.send({"message": "Success", "data": userData});
    res.status(200);

  } catch (err) {

    console.log(err);
    res.send({"message": "A server error occured", "error": err})
    res.status(500);

  }
})

app.post('/:uid', (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({"Message":"Method Not Allowed"});
})

app.put('/:uid', async (req, res) => {
  const Org = req.org;
  const oid = req.oid;
  const perms = req.body.perms;
  const admin = req.body.admin;
  const uid = req.params.uid;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      await Org.findOneAndUpdate(
        {"oid": oid, "users.uid": uid}, 
        {
          $set: {
            "users.$.budgetperms": perms,
            "users.$.admin": admin
          }
        }
      );

      res.send({"message": "User added updated"});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

app.delete('/:uid', async (req, res) => {
  const Org = req.org;
  const User = req.user;
  const oid = req.oid;
  const uid = req.params.uid;
  const token = req.query.token;

  if (!token)  {

    res.send({"message": "You do not have permission to access this resources"});
    res.status(401);    

  } else {
    try {

      await Org.updateOne(
        {"oid": oid}, 
        {
          $pull: {
            users: { "uid": uid }
          }
        }
      )

      await User.updateOne(
        {"uid": uid},
        {
          $pull: {
            "orgs": oid
          }
        }
      );

      res.send({"message": "User added successfully", "data": data});
      res.status(204);

    } catch (err) {

      console.log(err);
      res.send({"message": "A server error occured", "error": err.message});
      res.status(500);

    }
  }
})

module.exports = app;