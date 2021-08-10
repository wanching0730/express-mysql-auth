const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const db = require("./app/models");
const CustomError = require("./app/utils/custom-error");

const corsOptions = {origin: `http://localhost:${process.env.PORT}`};
app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

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

        // db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

// set up error handling
app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        // handle custom error message
        res.status(err.statusCode).json(err.message);
        console.log(err.message);
    } else {
        // handle general error message thrown from database
        res.status(500).json(`Errors occur in database: ${err.message}`);
        console.log(err); // log the full error message
    }
    return next();
});

// set up routes
require('./app/routes/purchase.route')(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
