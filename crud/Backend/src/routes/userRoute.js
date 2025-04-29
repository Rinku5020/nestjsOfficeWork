const express = require("express");
const { formCreate } = require("../controllers/user.controller");


const  UserRouter= express.Router()

UserRouter.post('/createform',formCreate);

 

module.exports= UserRouter;