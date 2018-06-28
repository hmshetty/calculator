const express = require('express');
const app = express();

const router = require('./routers/calcRouter');
app.use("/", router);
app.listen(80);
module.exports = app;