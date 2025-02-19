const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName:
    {
        type: String,
        required: true
    },
    LastName:
    {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        unique: [true, "Phone number is already in use."],
    },

    Email: {
        type: String,
        required:true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true,
        enum: ['borrower', 'admin'],
    },
    PanCard: {
        type: String,
        required: true
    },
    AdhaarCard: {
        type: String,
        required: true
    },
},
    { timestamps: true })


module.exports = mongoose.model('users', userSchema)
