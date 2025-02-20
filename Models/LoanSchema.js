const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema({
    LoanName:
    {
        type: String,
        required: true
    },
    Type:
    {
        type: String,
        enum: ['Personal Loan', 'Business Loan', 'Education Loan', 'Home Loan', 'Car Loan'],
        required: true
    },
    MaxAmount: {
        type: Number,
        required: true
    },
    InterestRate: {
        type: Number,
        required: true
    },
    EmiSchedule: {
        type: String,
        required: true,
        enum: ['3 Month', '4 Month', '6 Month', '12 Month']
    },
    Eligibilty: [
        {
            Condition: {
                type: String,
                required: true
            },
            Value: {
                type: String,
                required: true
            }
        }
    ],
},
    { timestamps: true })

module.exports = mongoose.model('loan', loanSchema)
