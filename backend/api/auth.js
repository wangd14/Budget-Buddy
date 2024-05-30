const express = require('express');
const app = express.Router();


app.get('/', (req, res) => {
  res.set("Allow", "POST");
  res.status(405);
  res.send({"message":"Method Not Allowed"});
})

app.post('/', async (req, res) => {
  const User = req.user;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const uid = req.body.uid;
  

  if (!fname || !lname || !email || !uid) {

    res.send({"message": "Missing parameters", "data":{
      "message": "The server processed the following data",
      "uid": uid,
      "fname": fname,
      "lname": lname,
      "email": email
    }});
    res.status(400);

  } else {
    try {
      
      const newUser = new User({
        "uid": uid,
        "fname": fname,
        "lname": lname,
        "email": email,
        "orgs": [],
        "msgs": [
          {
            title: "Welcome!",
            text: "Welcome to Budget Buddy " + fname + "!",
            time: new Date().getTime(),
            link: "" 
          }
        ],
        "exists": true
      });
      await newUser.save();

      res.send({"message": "User successfully created", "data": { "uid": uid }})
      res.status(201);

    } catch (err) {

      console.log(err)
      res.send({"message": "error, user not created", "error": err.message});
      res.status(500);

    }
  }
})

app.put('/', (req, res) => {
  res.set("Allow", "POST");
  res.status(405);
  res.send({"message":"Method Not Allowed"});
})

app.delete('/', (req, res) => {
  res.set("Allow", "POST");
  res.status(405);
  res.send({"message": "Method Not Allowed"});
})

module.exports = app;