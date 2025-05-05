const express = require("express");
const Connection = require("./db");
const userRouter = require("./routes/userRoute");
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/user',userRouter);



Connection.sync()
  .then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log(` Server running on port ${process.env.APP_PORT}` );
    });
  })
  .catch(err => {
    console.error(' Sync failed:', err);
  });