const express = require("express");
const router = express.Router();

const { addContact, getAllContactsByUser, UpdateContact, deleteContact , userContact } = require("../controller/contactController");
const { verifyAuth } = require("../middleware/authUser");

router.post("/addContact", verifyAuth, addContact);
router.get("/getContact", getAllContactsByUser);
router.get("/userContact", userContact);
router.put("/updateContact", verifyAuth, UpdateContact);
router.delete("/deleteContact/:id", verifyAuth, deleteContact);


module.exports = router;