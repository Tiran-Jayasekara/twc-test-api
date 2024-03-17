const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
        },
        password: {
            type: String,
            required: [true, "Please Enter Password"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model.User || mongoose.model("User", UserSchema);

module.exports = User;
