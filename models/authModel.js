const mongoose =require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is Require"],
    },
    email: {
        type: String,
        required: [true, "Email Is Require"],
    },
    password: {
        type: String,
        required: [true, "Password Is Require"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
  },
    {
        timestamps: true,
    }

);
module.exports = mongoose.model("users", userSchema);