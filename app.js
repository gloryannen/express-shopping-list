const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./itemRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/items", itemRoutes );


// ERROR HANDLER

app.use((req, res, next)=>{
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use(function(err, req, res, next) {
    // The default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;

    // Set the status and alert the user
    return res.status(status).json(
        {
            error: { message, status}
        }
    );
});

module.exports = app;