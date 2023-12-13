const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_URI;

main()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(URI);
}

module.exports = main;