const Contact = require("../model/contactModel");
const { jwtDecode } = require('jwt-decode');


const Joi = require("joi").extend(require("@joi/date"));

function validateContact(req) {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        number: Joi.number().required(),
        gender: Joi.string().required(),
    });
    return schema.validate(req);
}

// Add new contact
module.exports.addContact = async (req, res) => {
    try {
        const token = req.header(process.env.ReqHeader);
        const decoded = jwtDecode(token);
        const { id } = decoded;

        const { error } = validateContact(req.body);
        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const { fullName, email, number, gender } = req.body;
            const isContactAlreadyExist = await Contact.findOne({ userId: id, number });
            if (isContactAlreadyExist) {
                res.status(200).json({ message: "This Contact is Already Exist !" });
            } else {
                const contact = await Contact.create({
                    userId: id, fullName, email, number, gender
                });

                if (contact) {
                    res.status(200).json({ message: "contact Add Successfull", contact });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Get All Contacts
module.exports.getAllContactsByUser = async (req, res) => {
    try {
        const token = req.header(process.env.ReqHeader);
        const decoded = jwtDecode(token);
        const { id } = decoded;
        const AllContactsByUser = await Contact.find({ userId: id });

        if (AllContactsByUser) {
            res.status(200).json({ message: "All Contacts By User", AllContactsByUser });
        } else {
            res.status(400).json({ message: "No Contacts" });
        }
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
};


// check User already have contacts or not
module.exports.userContact = async (req, res) => {
    try {
        const token = req.header(process.env.ReqHeader);

        if (!token) {
            return res.status(200).json({ message: "No Token Provide" });
        } else {
            const decoded = jwtDecode(token);
            const { id } = decoded;
            const userContacts = await Contact.find({ userId: id });
            if (userContacts.length > 0) {
                res.status(200).json({ message: "add New Contact" });
            } else {
                res.status(200).json({ message: "add your first Contact" });
            }
        }

    } catch (error) {
        return res.status(401).json(error);
    }
}


// Update Contact
module.exports.UpdateContact = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        userId: Joi.string().required(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        number: Joi.number().required(),
        gender: Joi.string().required(),
    });

    try {
        const { _id, userId, fullName, email, number, gender } = req.body;
        const { error } = schema.validate({
            _id, userId, fullName, email, number, gender
        });

        if (error) {
            res.status(200).json({ message: error.message });

        } else {
            const updateContact = await Contact.findOneAndUpdate({ _id: _id }, { userId, fullName, email, number, gender }, { new: true });
            if (updateContact) {
                res.status(200).json({ message: "Update Success", updateContact });
            } else {
                res.status(400).json({ message: "Update UnSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Delete Contact
module.exports.deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const deleteContact = await Contact.findByIdAndDelete(contactId);
        if (deleteContact) {
            res.status(200).json({ message: "Contact Delete Success", deleteContact })
        } else {
            res.status(400).json({ message: "Couldnt find Contact " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}