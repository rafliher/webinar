const controller = require("../controllers/form.controller");
const { body } = require('express-validator')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/register", [
        body('name').isLength({ min: 1 }),
        body('email').trim().isEmail(),
        body('phone').whitelist('+1234567890'),
    ], controller.register);

    app.get("/api/result", controller.all)
};
