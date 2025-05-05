const User = require("../models/userModel");




const createUser = async (req,res)=>{
   
    try {
        const user = await User.create(req.body)
        res.status(201).send({ message: 'User created successfully', user })
        
    } catch (error) {   
        console.error(error);
    res.status(500).json({ message: 'Error creating user', error });
    }
}


module.exports = createUser