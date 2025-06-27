import express from "express";
import cors from "cors";
import hrRoutes from './Routes/hr.js';
import userRoutes from './Routes/user.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/hr', hrRoutes);
app.use('/api/user', userRoutes);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

