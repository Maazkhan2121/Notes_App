const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SEC = 'Maaz is a good $boy'


// Route 1 : create a user using POST "/api/auth/createuser", No login required

router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('Email', 'enter a valid Email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    let success = true;

    // if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() })
    }
    // check wether the user with this email exisit already

    let user = await User.findOne({ Email: req.body.Email })
    console.log(user);
    if (user) {
        return res.status(400).json({ success ,  error: "sorry a user with this email already exist" })
    }
    const salt = await bcrypt.genSalt(10);
    const secpas = await bcrypt.hash(req.body.password, salt)
    //create a new user
    try {


        user = await User.create({
            name: req.body.name,
            password: secpas,
            Email: req.body.Email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SEC)
        res.json({authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }


})

//Route 2 : Authentication a user using POST "/api/auth/Login", No login required
router.post('/Login', [
    body('Email', 'enter a valid Email').isEmail(),
    body('password', 'password cannot be blanked').exists(),
], async (req, res) => {

    let success= true;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { Email, password } = req.body;
    try {
        let user = await User.findOne({ Email })
        if (!user)
            return res.status(400).json({success, error: "please try to login with correct crendtial" })

    
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "please  login with correct crendtial" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SEC)
        success = true;
        res.json( success, authtoken)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }

})


// Route 3 : Get login user using Details POST "/api/auth/getuser", login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    };
})


module.exports = router;