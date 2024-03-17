const express = require("express");
const database = require("./database/database");

const app = express();
const port = 3001;
var cors = require("cors");

app.use(express.json());
app.use(cors());


const userRouter = require('./route/user');
const contactRouter = require('./route/contact');

app.use("/user", userRouter);
app.use("/contact", contactRouter);


app.listen(port, () => {
    console.log(`Node JS app listening on port ${port}`);
    database();
  });