const express = require('express');
const Connection = require('./db');
const app = express();



app.listen(process.env.PORT|| 3000, async()=>{
    try {
        await Connection;
        console.log(`server is running at:${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})