const express = require("express");

const customerRouter = require("./router/customer");
const personRouter = require("./router/person");

const app = express();

app.use(express.json());
app.use(customerRouter);
app.use(personRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT);
