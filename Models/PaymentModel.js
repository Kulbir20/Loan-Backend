const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    LoanId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loan',
        required: true
    },
    Amount:
    {
        type: Number,
        required: true,
        unique: true
    },
    PaymentDate: {
        type: Date,
        default: Date.now
    },
    Method:
    {
        type: String,
        required: true,
        enum:
            [
                'Bank Transfer', 'Credit Card', 'Cash'
            ]
    }

})


module.exports = mongoose.model('payment', paymentSchema)

