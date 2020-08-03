const express = require("express");

const personRouter = require("./controller/person.controller");
const customerRouter = require("./controller/customer.controller");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(personRouter);
app.use(customerRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
