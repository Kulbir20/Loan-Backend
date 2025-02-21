const mongoose = require('mongoose')

const loanFormSchema = new mongoose.Schema({
    UserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    BankAccNo:
    {
        type: Number,
        required: true
    },

    IfscCode:
    {
        type: String,
        required: true
    },

    AccountHolderName:
    {
        type: String,
        required: true
    },

    PanCard: {
        type: String,
        required: true
    },

    SalarySlip: {
        type: String,
        required: true
    },

    BankPassbook: {
        type: String,
        required: true
    },
},
    { timestamps: true })

module.exports = mongoose.model('loanform', loanFormSchema)
