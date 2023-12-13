const express = require("express");
const app = express()
const port = 8000;
const connection = require("./connection");
const todoRoutes = require("./Routers/todoRouter");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port, ${port}`);
});