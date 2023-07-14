const db = require("../models");
const Response = db.responses;

const { validationResult } = require('express-validator');
const { Op } = require("sequelize");

exports.register = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(`[registration fail][${new Date()}]`, req.body, errors.array());
        return res.status(422).send({ message: "Invalid input", errors: errors.array() })
    }
    Response.findOne({
        where: {
            [Op.or]: {
                email: req.body.email,
                phone: req.body.phone,
            }
        }
    }).then(x => {
        if (x) {
            return res.status(422).send({ message: "Email or phone number already registered" })
        }
        Response.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }).then(user => {
            console.log(`[registration][${new Date()}] ${req.body.name} - ${req.body.email}`);
            res.status(200).send({ message: "Registered successfully!" });
        }).catch(err => {
            console.log(err);
            res.status(422).send({ message: err.message });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
    });
}

exports.all = (req, res) => {
    Response.findAll({}).then(x => {
        res.status(200).send({ data: x });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
    });
}
