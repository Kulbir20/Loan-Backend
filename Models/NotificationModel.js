const mongoose = require('mongoose')


const notificationSchema = new mongoose.Schema({
    UserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    Message:
    {
        type: String,
        required: true
    },
   Type: {
        type: String,
        required: true,
        enum:
        ['Reminder','Approval Update','General'],
        default:'General'
    },
    SentAt: {
        type: Date,
        default:Date.now
    }
})


module.exports = mongoose.model('notification', notificationSchema)
