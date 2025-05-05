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

    const getUser = async (req,res)=>{
        try {
            const user = await User.findAll()
            res.status(200).send({ message: 'User finds successfully', user })
            
        } catch (error) {   
            console.error(error);
        res.status(500).json({ message: 'Error to find user', error });
        }
    }

    const getUserByid = async (req,res)=>{
        try {
            const user = await User.findOne({where:{id:req.params.id}})
            if(!user){
                res.status(404).send({ message: 'User not found' })
            }else{
                res.status(200).send({ message: 'User find successfully', user })
            }

        
        } catch (error) {   
            console.error(error);
        res.status(500).json({ message: 'Error to find user', error });
        }
    }

    const deleteUser = async (req,res)=>{
        try {
            const user = await User.destroy({where:{id:req.params.id}})
            if(!user){
                res.status(404).send({ message: 'User not found' })
            }else
            {
                res.status(200).send({ message: 'User deleted successfully', user })
            }
        
            
        } catch (error) {   
            console.error(error);
        res.status(500).json({ message: 'Error to delete user', error });
        }
    }

    const updateUser = async (req, res) => {
        try {
            const [updatedRows] = await User.update(req.body, { where: { id: req.params.id } });
            if (updatedRows === 0) {
                res.status(404).send({ message: 'User not found' });
            } else {
                res.status(200).send({ message: 'User updated successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to update user', error });
        }
    };


    module.exports = {createUser,getUser,getUserByid,deleteUser,updateUser}