import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export const register = async (req, res) => {
    try
    {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "Name is required"
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and at least 6 characters long"
            });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({
                error: "Email is taken"
            })
        }

        const hashedPassword = await hashPassword(password);

        const customer = await stripe.customers.create({
            email,
        });
        

        try {
            const user = await new User({
                name,
                email,
                password: hashedPassword,
                stripe_customer_id: customer.id
            }).save();

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            const {password, ...rest} = user._doc

            return res.json({
                token,
                user: rest
            });
        } catch (error) {
            console.log(error);
        }
        res.json({
            data: "This is /regsiter endpoint"
        });
        console.log(req.body);

    } catch (error)
    {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({
                error: "No user found."
            });
        }
        const match = await comparePassword(req.body.password, user.password);
        if (!match) {
            return res.json({
                error: "Incorrect password."
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const { password, ...rest } = user._doc;

        res.json({
            token,
            user: rest
        });
    } catch (err) {
        console.log(err);
    }
};