const express = require('express');
const app = express.Router();

/*
============ 
/user
============
*/

app.get('/', async (req, res) => {
  console.log("GET /user called");
  const User = req.user;
  try {

    //We need to go through all of the contents of User
    const arr = await User.find({});

    let data = {};
    data.message = "Success";
    data.data = [];

    for (let i = 0; i < arr.length; i++) {
        let objEntry = {};
        objEntry.uid = arr[i].uid;
        objEntry.email = arr[i].email;
        console.log(objEntry);
        data.data.push(objEntry);
    }

    res.status(200).send(data);

  } catch (error) {

    console.error("Error connecting to database: ", error);
    let errorObj = {};
    errorObj.message = "A server error occured";
    res.status(500).send(errorObj);

  }
})

app.post('/', (req, res) => {
  //Redirect to POST /auth.js
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({"Message":"Method Not Allowed"});
})

app.put('/', async (req, res) => {
  const User = req.user;
  let data = {};
  try {
    

    

    //We need to update all of the contents of User
    if (req.query.user) {
      await User.updateMany({}, {
          username: req.query.user
      });
    }

    if (req.query.pass) {
      await User.updateMany({}, {
          password: req.query.pass
      });
    }

    if (req.query.fname) {
      await User.updateMany({}, {
          fname: req.query.fname
      });
    }

    if (req.query.lname) {
      await User.updateMany({}, {
          lname: req.query.lname
      });
    }

    if (req.query.new_email) {
      await User.updateMany({}, {
          email: req.query.new_email
      });
    }

    data.message = "Data successfully updated";

    
    res.status(200).send(data);
  } catch (error) {
    
    console.error("Error connecting to database: ", error);
    data.message = "A server error occured";
    res.status(500).send(data);
  }
})

app.delete('/', async (req, res) => {
  //******************************************* NOTE: Needs 401 case for unauthorized access *******************************************
  console.log("DELETE /user called");
  const User = req.user;

  let data = {};

  try {
    

    

    //We need to delete all of the contents of User
    const arr = await User.deleteMany({});

    data.message = "Success";

    
    res.status(200).send(data);

  } catch (error) {

    
    console.error("Error connecting to database: ", error);
    data.message = "A server error occured";
    res.status(500).send(data);

  }
})

/*
============ 
/user/:uid
============
*/

app.get('/:uid', async (req, res) => {

  console.log("GET /user/:uid called");
  const User = req.user;
  const uid = req.params.uid;
  const token = req.query.token

  let data = {};

  try {
    
    const arr = await User.findOne({"uid" : uid});
    

    if (arr == undefined) throw new Error("User not found...");

    data.data = arr;
    data.message = "Success";

    
    res.status(200).send(data);

  } catch (error) {

    console.error("Error connecting to database: ", error);
    data.message = "A server error occured";
    res.status(500).send(data);

  }
})

app.post('/:uid', (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  res.status(405);
  res.send({"Message":"Method Not Allowed"});
})

app.put('/:uid', async (req, res) => {
  const User = req.user;
  //Does not currently search by email
  //******************************************* NOTE: Needs 401 case for unauthorized access *******************************************
  const uid = req.params.uid;
  const fname = req.body.fname;
  const lname = req.body.lname;

  let updateObject = {};

  // Check if each parameter is provided and assign it to the updateObject if it exists
  if (fname) updateObject.fname = fname;
  if (lname) updateObject.lname = lname;

  try {

    await User.updateOne({ uid: uid }, { $set: updateObject }).catch(
      async function (error) {
        // On failure
        console.error("Error connecting to database: ", error);
        res.status(500).send({"message": "A server error occured"});
      });
    
    res.status(200).send({"message": "Success","data": updateObject});

  } catch (error) {

    console.error("Error connecting to database: ", error);
    res.status(500).send({"message": "A server error occured"});

  }
});

app.delete('/:uid', async (req, res) => {
  const User = req.user;
  const uid = req.params.uid;
  let data = {};

  try {
    await User.deleteOne({uid: uid});

    data.message = "Success";
    
    res.status(200).send(data);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    data.message = "A server error occured";
    res.status(500).send(data);
  }
})

module.exports = app;