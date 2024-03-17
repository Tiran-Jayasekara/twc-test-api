const mongoose = require("mongoose");

// Contact Schema
const ContactSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Contact = mongoose.model.Contact || mongoose.model("Contact", ContactSchema);

module.exports = Contact;
