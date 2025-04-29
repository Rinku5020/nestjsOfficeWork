
import UserRouter from './src/routes/userRoute.js';
import connection from './db.js';
import express from 'express';
import cors from 'cors';


 const app = express();
 app.use(express.json());
 app.use(cors());

app.use("/user",UserRouter)


const PORT = 8080;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Connection failed:', error);
    }
});
