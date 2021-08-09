const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const db = require("./app/models");

let corsOptions = {origin: `http://localhost:${process.env.PORT}`};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// initialise database
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
        db.sequelize.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
