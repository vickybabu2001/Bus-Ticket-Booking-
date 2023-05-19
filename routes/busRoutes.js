const router=require("express").Router();
const Bus  =require("../models/busModel.js");
const requireSignin=require("../middlewares/authMiddlewares");

// add bus
router.post("/add-bus",requireSignin,async (req, res) => {
    try {
        const existingBus = await Bus.findOne({number: req.body.number});
        if (existingBus) {
            return res.status(200).send({
                success: false,
                message: "Bus already exists",
            });
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success: true,
            message: "Bus added successfully",
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
// get-all-buses

router.post("/get-all-buses",requireSignin, async (req, res) => {
    try {
      const buses = await Bus.find(req.body.filters);
      console.log(buses);
      return res.status(200).send({
        success: true,
        message: "Buses fetched successfully",
        data: buses,
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });
  // delete-bus

router.post("/delete-bus", requireSignin, async (req, res) => {
    try {
      await Bus.findByIdAndDelete(req.body._id);
      return res.status(200).send({
        success: true,
        message: "Bus deleted successfully",
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });
  // update-bus

router.post("/update-bus", requireSignin, async (req, res) => {
    try {
    let bus=await Bus.findByIdAndUpdate(req.body._id, req.body);
     let bus1=await bus.save();
      return res.status(200).send({
        success: true,
        message: "Bus updated successfully",
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });
  router.post("/get-bus-by-id",requireSignin, async (req, res) => {
    try {
      const bus = await Bus.findById(req.body._id);
      return res.status(200).send({
        success: true,
        message: "Bus fetched successfully",
        data: bus,
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });
  
   
  module.exports =router;