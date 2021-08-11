const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const CustomError = require("./app/utils/custom-error");
const {initDatabase} = require("./app/utils/init-database");
const logger = require("./app/utils/logger")(__filename);

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
initDatabase();

// set up routes
require('./app/routes/purchase.route')(app);
require('./app/routes/auth.route')(app);


// set up error handling
app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        // handle custom error message
        logger.error(err.message);
        res.status(err.statusCode).json(err.message);
    } else {
        // handle general error message thrown from database
        logger.error(err); // log the full error message
        res.status(500).json(`Errors occur in database: ${err.message}`);
    }
    return next();
});

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
});
