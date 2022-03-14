const express = require("express");
const router = express.Router();
const fetchuser = require("../midleware/fetchuser");
const User = require("../models/User");

//Route 1
//Add a new note by POST request at "api/notes/addTask"  login required
router.post("/addTask", fetchuser,async (req, res) => {
    //create and save a new task
    try {
      const { title, desc } = req.body;
      await User.updateOne({_id: req.user.id},{$push:{createdTasks:{title,desc}}})
      res.status(200).send({
        success:true
      })
    } catch (error) {
      console.log(error.message);
      res.status(500).send({
        success:false,
        error: "Some error occured"
      });
    }
  }
);

router.post("/deleteTask", fetchuser,async (req, res) => {
  //create and save a new task
  try {
    await User.updateOne({_id: req.user.id},{$pull:{createdTasks:{_id: req.body.id}}})
    res.status(200).send({
      success:true
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success:false,
      error: "Some error occured"
    });
  }
}
);

router.post("/shareTask", fetchuser, async (req, res) => {
  try {
    const { toEmail,title,desc } = req.body;
    const sendTo = User.find({email: toEmail});
    if(!sendTo){
      return res.status(400).send({
        success:false,
        message:"No User with this Email exists"
      })
    }
    await User.updateOne({ email: toEmail }, { $push: { pendingTasks: {title,desc} } });
    res.status(200).send({
      success:true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success:false,
      error: "Some error occured"
    });
  }
});


router.post("/taskRequest", fetchuser, async (req, res) => {
  try {
    const { title,desc,tId, verdict } = req.body;
    if(verdict){
    await User.updateOne({_id: req.user.id },{$push:{createdTasks:{title,desc}}});
    }
    await User.updateOne({_id: req.user.id},{$pull:{pendingTasks:{_id: tId}}})
    res.status(200).send({
      success:true
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success:false,
      error: "Some error occured",
      msg: error.message
    });
  }
});

module.exports = router;
