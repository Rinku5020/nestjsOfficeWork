const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/userModel")

const createUser = async (req,res)=>{
    try {
        const  {FirstName,LastName,Email,Address,Phone,Gender,DOB,Hobbies,Image} = req.body
        if(!FirstName || !LastName || !Email || !Address || !Phone || !Gender || !DOB || !Hobbies || !Image){
            return res.status(400).send('All fields are required')
        }
        const user = await userModel.create({
            FirstName,
            LastName,
            Email,
            Address,
            Phone,
            Gender,
            DOB,
            Hobbies: Hobbies || [],
            Image
        })
        res.status(200).send({ message: "user created successfully", user })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "something went wrong", error })
    }
    
}



module.exports = createUser;