const express = require('express');
const app = express.Router();

/*
============ 
/org/:oid/receipt/:rid
============
*/

//Accept Invite
app.get("/:uid", async (req, res) => {
  const Invite = req.invite;
  const User = req.user;
  const oid = req.oid;
  const token = req.query.token;
  const inviterUid = req.query.uid;
  const time = req.query.time;
  const invitedUid = req.params.uid;

  try {

    const data = await Invite.deleteOne({
      "invitedUid": invitedUid,
      "inviterUid": inviterUid,
      "oid": oid,
      "timestamp": time
    });

    console.log(data);

    await User.updateOne(
      {"uid": invitedUid}, 
      { $pull : {
          "time": time
        }
      }
    );

    const orgData = Org.findOne({"oid": oid});
    const orgName = orgData[0].orgname;

    await User.updateOne(
      {"uid": invitedUid},
      { 
        $push: { 
          "msgs": {
            "title": "You have joined a new Organization",
            "text": "You accepted an invite to join " + orgName + ".",
            "time": new Date().getTime(),
            "link": "",
          }
        } 
      }
    );

    

    res.send({"message": "success"});
    res.status(204);
  } catch (err) {
    console.log(err);
    res.send({"message": "Error!", "error": err.message});
    res.status(500);
  }
});

//Send Invite
app.post("/:email", async (req, res) => {
  const Invite = req.invite;
  const User = req.user;
  const Org = req.Org;
  const oid = req.oid;
  const token = req.query.token;
  const inviterUid = req.body.uid;
  const invitedEmail = req.params.email;
  console.log("I cooked");
  try {

    const data = await User.findOne({"email": invitedEmail});
    const uid = data.uid;

    const time = new Date().getTime();
    const newInvite = new Invite({
      "inviterUid": inviterUid,
      "invitedUid": uid,
      "oid": oid,
      "timestamp": time
    });
    await newInvite.save();

    const orgData = Org.findOne({"oid": oid});
    const orgName = orgData[0].orgname;

    await User.updateOne(
      {"uid": uid},
      { $push: { 
          "msgs": {
            "title": "You have a new invite!",
            "text": "You have been invited to " + orgName + ". Would you like to accept?",
            "time": time,
            "link": "http://localhost:3000/org/" + oid + "/invite/" + uid + "?uid=" + inviterUid + "&time=" + time, 
          }
        } 
      }
    )

  } catch (err) {
    console.log(err);
    res.send({"message": "Error!", "error": err.message});
    res.status(500);
  }

})

module.exports = app;