import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';

const morgan = require('morgan');
require('dotenv').config();

const app = express();

// db
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));

// middleware
app.use(express.json({ limit: "5mb" }));
app.use(
    cors({
        origin: [process.env.CLIENT_URL]
}));

// autoload routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// listen
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`));
