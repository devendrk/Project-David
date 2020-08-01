const express = require("express");

const customerRouter = require("./controller/person.controller");
const personRouter = require("./controller/person.controller");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(customerRouter);
app.use(personRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
