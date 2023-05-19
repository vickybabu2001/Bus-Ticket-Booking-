const express = require("express");
const app = express();
const pdf = require('html-pdf');
const nodemailer = require('nodemailer');
const fs = require('fs');
const moragan = require("morgan");
require("dotenv").config();
const connectDB =require("./config/db");
const cors = require("cors"); 
const authRoute =require("./routes/authRoute");
const ticketRoute =require("./routes/ticketRoute");
const busRoutes =require("./routes/busRoutes");
const requireSignin=require("./middlewares/authMiddlewares");
 connectDB();
//middelwares
app.use(moragan("dev"));
app.use(cors());
app.use(express.json());
//routes
app.use("/api/users", authRoute);
app.use("/api/buses", busRoutes);
app.use("/api/ticket",ticketRoute);
// pdf generate hit api
app.post('/api/sendConfirmationEmail', (req, res) => {
    const { email } = req.body;
  
    // Create a transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ece19435@gmail.com',
        pass: 'vicky@123',
      },
    });
  
    // Configure email options
    const mailOptions = {
      from: 'ece19435@gmail.com',
      to: email,
      subject: 'Booking Confirmation',
      text: 'Thank you for booking. Here are your details:'
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
      } else {
        console.log('Email sent:', info.response);
        res.sendStatus(200);
      }
    });
  });
  
const port=process.env.PORT || 7000;
app.listen(port,()=>{console.log(`Run on ${port}`)});