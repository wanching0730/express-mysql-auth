const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const db = require("./app/models");
const CustomError = require("./app/utils/custom-error");
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
db.sequelize
    .authenticate()
    .then(() => {
        logger.info('Connection has been established successfully');
        db.sequelize.sync();

        // db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    })
    .catch(err => {
        logger.error('Unable to connect to the database: ', err);
    });

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
