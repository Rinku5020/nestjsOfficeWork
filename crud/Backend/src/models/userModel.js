import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    gender: String,
    hobbies: [String],
    birthdate: Date,
    address: String,
    Image: String,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
