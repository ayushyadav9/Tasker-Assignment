const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../midleware/fetchuser");
const JWT_SECRET = process.env.SECRET_KEY;


//Route 1
// create a post request at "api/auth/createUser"  no login required
router.post("/createUser", async (req, res) => {
    try {
      //check whether the user with same email exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success:false, message: "User with this email already exists" });
      }
      //create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); //encrypted the password and added salt with it
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {id: user.id}
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success:true ,authToken });
      //if other errors
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
        err: error.message
      });
    }
  }
);


//Route 2
// login a user by POST request at "api/auth/loginUser"  no login required
router.post("/login",async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success:false ,message:"Please try to login with correct credentials"})
      }
      const passComp = await bcrypt.compare(password,user.password);
      if(!passComp){
        return res.status(400).json({ success:false ,message:"Please try to login with correct credentials"})
      }
      const data = {user: {id: user.id},};
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success:true, authToken });

    } catch (error) {
      res.status(500).send({
        err: error.message,
        message: "Internal error occured",
        success: false
      });
    }
  }
);


//Route 3
//Get a user by POST request at "api/auth/getUser" login required
router.post("/getUser",fetchuser,async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findOne({_id:userId}).select(["-password","-timestamp"])
      res.status(200).send({
        user,
        success:true
      })
    } catch (error) {
      res.status(500).send({
        message: "Internal error occured",
        err: error.message,
        success: false
      });
    }
});



module.exports = router;
