const express = require('express');
const dotenv = require('dot-env');
const connectDB = require('./dbconfig/db');
const router = express.Router();

dotenv.config();
const app = express();


app.use(express.json);
app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Sever Started at ${PORT}`));




