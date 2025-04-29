const { userModel } = require("../models/userModel");


const formCreate = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            gender,
            hobbies,
            birthdate,
            address,
            Image
        } = req.body;

    
        let formattedBirthdate = null;
        if (birthdate) {
            const [day, month, year] = birthdate.split('/');
            formattedBirthdate = new Date(`${year}-${month}-${day}`);
        }

        const users = new userModel({
            firstName,
            lastName,
            email,
            phone,
            gender,
            hobbies,
            birthdate: formattedBirthdate, 
            address,
            Image
        });

        await users.save();
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports={formCreate}