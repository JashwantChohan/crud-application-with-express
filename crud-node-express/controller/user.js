const userModel = require('../model/user');  // Ensure this is correct

// create and save a new user
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.email && !req.body.FirstName && !req.body.LastName && !req.body.phone) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    // Create a user
    const user = new userModel({
        email: req.body.email,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        phone: req.body.phone
    });

    // Save user in the database
    try {
        const data = await user.save();
        res.send({
            message: "User created successfully",
            user: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    }
};




// retrive all users from the database

exports.findAll = async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//  find a single user with an id
exports.findOne = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    // Check if email exists for a different user
    if (req.body.email) {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).send({
                message: "The email is already in use by another user."
            });
        }
    }

    try {
        const data = await userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
        if (!data) {
            return res.status(404).send({
                message: `User not found.`
            });
        }
        res.send({
            message: "User updated successfully.",
            user: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    console.log("ID to delete: ", req.params.id);  // Log the id

    try {
        const data = await userModel.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send({
                message: `User not found with id ${req.params.id}.`
            });
        }
        res.send({
            message: "User deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting user."
        });
    }
};
