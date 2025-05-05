const express = require("express");
const {createUser, getUser, getUserByid, deleteUser, updateUser} = require("../controllers/userController");



const userRouter = express.Router();


userRouter.post('/create',createUser)
userRouter.get('/getform',getUser)
userRouter.get('/getform/:id',getUserByid)
userRouter.delete('/delete/:id',deleteUser)
userRouter.put('/update/:id',updateUser)


module.exports = userRouter