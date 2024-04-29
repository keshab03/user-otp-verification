const mongoose = require('mongoose');


const userOtpSchema = new  mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    }
});
const  UserOTP = new mongoose.model( "userops",userOtpSchema);
module.exports=UserOTP;