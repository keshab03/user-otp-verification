const SignUp = require('../models/Signup')
const UserOtp = require('../models/Userotp')
const bcrypt = require('bcrypt');
const nodemailer  = require("nodemailer");

// email config //

const  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
})

// Get all employees For Hr's
const getAll = async (req, res) => {

    try {
        const userData = await SignUp.find({ id: req.body.id });
        // console.log(userData)
        const user = await SignUp.find().sort({ createdAt: -1 });
        res.send({ user, status: 200, userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllEmployee = async (req, res) => {

    try {
        const employee = await SignUp.find();
        // console.log(employee)
        res.send({ employee, status: 200 });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const sendOtp = async  (req, res) => {

    try {
        const userData = await UserOtp.findOne({ email: req.body.email });

        if (userData) {
            return res.send({ message: "User Already Exists", status: 409 });
        } else {
            const otp = Math.floor(100000 + Math.random() * 99999);
            const { email } = req.body;
        
            const saveOtpData = new UserOtp({
                email : email,
                otp   : otp,
            })
            await saveOtpData.save();
        
            const mailOptions = {
                from : process.env.EMAIL,
                to   : email,
                subject : "OTP for Registration",
                text : `Your OTP is ${otp}`
            }
            // send the email with nodemailer and show a success response if it works
            transporter.sendMail(mailOptions, function(err, info){
                if (err) {
                    console.log('Error occurred',err);
                    return res.status(503).send("Email Service is Down");
                    }
                    console.log('Message sent successfully',info.response);
                    return res.status(200).json({ message: "An Email has been Sent"});
            });       
        }
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error while signup', status: 500 });
    }
}

const signup = async (req, res) => {
    try {
        const userData = await SignUp.findOne({ email: req.body.email });
        const otpData = await UserOtp.findOne({ email: req.body.email });
        console.log(req.body);

        if (userData) {
            res.json({ message: "User Already Exists", status: 409 });
        } else {
            const { name, email, password, userotp } = req.body;
            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const employeesignup = new SignUp({ name, email, password: hashedPassword });
            if (userotp == otpData.otp ) {
            await employeesignup.save();
                
                res.send({ message: 'Employee signUp successfully', status: 200 });
            }else{
                res.send({ message: 'Otp missmatch', status: 401});
            }
        }
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error while signup', status: 500 });
    }
};

const login = async (req, res) => {
    try {
        const userData = await SignUp.findOne({ email: req.body.email });
        // console.log(userData)
        if (userData) {
            const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);

            if (isPasswordValid && req.body.email === userData.email) {
                return res.send({ message: 'Successful Logged In.', status: 200 });
            }
            else if (!isPasswordValid) {
                return res.send({ message: 'Please enter a valid password', status: 401 });
            }
        } else {
            return res.send({ message: 'User not found', status: 404 });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error while login' });
    }
};

module.exports = { getAll, getAllEmployee, signup, login, sendOtp }