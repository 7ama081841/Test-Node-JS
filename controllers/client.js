const Client = require("../model/client");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();

const registerClient = async (req, res) => {
    try {
        const isEmail = await Client.countDocuments({ email: req.body.email });

        if (isEmail >= 1) {
            console.log(isEmail);
            return res.send(" User already exists");
        }

        const schema = Joi.object({
            firstName: Joi.string().min(4).required(),
            lastName: Joi.string().min(4).required(),
            role: Joi.string().trim(),
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
            }),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,1024}$")),
        });

        const joiError = schema.validate(req.body);

        if (joiError.error) {
            const errorMessage = joiError.error.details
                .map((detail) => detail.message)
                .join(", ");

            return res.status(400).json({ error: errorMessage });
        }

        const newClient = new Client({ ...req.body });

        const solt = await bcrypt.genSalt(10);

        newClient.password = await bcrypt.hash(newClient.password, solt);

        await newClient.save();

        const token = jwt.sign(
            {
                email: newClient.email,
                password: newClient.password,
            },
            process.env.TOKENKEY
        );

        const client = _.omit(newClient.toObject(), ["password"]);

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                token,
                client,
            },
        });
    } catch (err) {
        return res.status(500).json(err);
    }
};

const loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const schema = Joi.object({
            email: Joi.string()
                .required()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                }),
            password: Joi.string()
                .required()
                .pattern(new RegExp("^[a-zA-Z0-9]{8,1024}$")),
        });

        const joiError = schema.validate(req.body);

        if (joiError.error) {
            const errorMessage = joiError.error.details
                .map((err) => err.message)
                .join(",");

            return res.status(404).json({ error: errorMessage });
        }

        const getClient = await Client.findOne({ email });

        if (!getClient) {
            return res
                .status(404)
                .json({ message: "email or password is not valid" });
        }

        const checkPassword = await bcrypt.compare(
            password,
            getClient.password
        );

        if (!checkPassword) {
            return res
                .status(404)
                .json({ message: "email or password is not valid" });
        }

        const token = jwt.sign(
            {
                email: getClient.email,
                password: getClient.password,
            },
            process.env.TOKENKEY
        );

        const client = _.omit(getClient.toObject(), ["password"]);

        res.status(200).json({
            success: true,
            message: "successduly created",
            data: {
                token,
                client,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();

        res.json(clients);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    registerClient,
    loginClient,
    getAllClients,
};
