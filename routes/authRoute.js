const router=require("express").Router();
 const bcrypt =require ("bcryptjs");
const authModel = require("../models/authModel");
const JWT=require("jsonwebtoken");
const requireSignin=require("../middlewares/authMiddlewares");
//router object
 
//routes
router.post("/register", async (req, res) => {

  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    const existing = await authModel.findOne({ email: req.body.email });
    if (existing) {
      return res.send({
        message: "User Already Registered",
        success: false,
        data: null,
      });
    }
    const hashpass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashpass;
    const newUser = await authModel.create(req.body);
    await newUser.save();
    res.send({
      message: "user registered sucessfully",
      success: true,
      data: newUser,
    });

  }
  catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
//login api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    const existing = await authModel.findOne({ email: req.body.email });
    if (!existing) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    const passMatch = await bcrypt.compare(req.body.password, existing.password);
    if (!passMatch) {
      return res.send({
        message: "Password Incorrect",
        sucess: false,
        data: null,
      });
    }
    //token
    const token = await JWT.sign({ userId: existing._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
       token,
    });

  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
router.post("/getbyid",requireSignin,async(req,res)=>{
  try {
    const user = await authModel.findById(req.body.userId);
    res.send({
        message:"User Fettched Sucessfully",
        success:true,
        data:user,
    });
  } catch (error) {
     res.send({
      message:error.message,
      success:false,
      data:null,
     });
  }
});
// get all users
router.post("/get-all-users",requireSignin, async (req, res) => {
  try {
    const users = await authModel.find({});
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
//export
module.exports = router;