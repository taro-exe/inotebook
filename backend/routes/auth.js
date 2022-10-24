const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'helloWorld@';

//ROUTE 1: create a User using: POST "/api/auth/createuser". Doesn't require login
router.post("/createuser",
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    async (req, res) => {
        let success = false;
        //For validating the input data as per the criterias given above
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            //To check whether the input email already exist in the database
            let user = await User.findOne({ email: req.body.email });
            // will proceed further only after the above function is resolved
            if (user) {
                return res.status(400).json({ success: 'Exists', error: 'Sorry a user with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //creating a new user after the validation is done
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                date: req.body.date
            });

            user = await User.findOne({ email: req.body.email });

            const data = {
                user: {
                    id: user.id
                }
            }

            const { name } = user;

            console.log(user.id);

            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken);

            success = true;
            res.json({ success, authtoken, name });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Interval Server Error');
        }

    });

// ROUTE 2: Autheticate a user using: POST "/api/auth/login". No login required
router.post("/login",
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please log in with correct credentials." })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please log in with correct credentials." });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const { name } = user;

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken, name });

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal server error');
        }

    });

//ROUTE 3: Get logged in user's detail using POST:'/api/auth/getuser'. Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
