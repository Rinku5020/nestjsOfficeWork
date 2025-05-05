const express = require('express');
const Connection = require('./db');
const userRouter = require('./routes/userRoute');
const app = express();
app.use(express.json());
app.use('user',userRouter)



app.listen(process.env.PORT|| 3000, async()=>{
    try {
        await Connection;
        console.log(`server is running at:${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})