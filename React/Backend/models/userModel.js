const mongoose = require('mongoose');
const UserShema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: [true, 'First Name is required']
    },
    LastName:{
        type: String,
        required: [true, 'Last Name is required']
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Invalid email address',
          },
    },

    Address: {
        type: String,
        required: [true, 'Address is required']
    },
    Phone: {
        type: String,
        required: [true, 'Phone is required'],
        validate: {
            validator: (value) => /^[0-9]{10}$/.test(value),
            message: 'Invalid phone number',
        }
    },
    Gender:{
        type: String,
        required: [true, 'Gender is required']
    },
    DOB: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    Hobbies:{
        type: String,
        required: [true, 'Hobbies is required']
    },
    Image:{
        type: String,
        required: [true, 'Image is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }

})

const userModel = mongoose.model('user', UserShema);
module.exports = userModel