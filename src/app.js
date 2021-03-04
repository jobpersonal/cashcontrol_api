if (!process.env.ISPROD) require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./router');


app.use(morgan('combined'));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running server on ${PORT}`))

