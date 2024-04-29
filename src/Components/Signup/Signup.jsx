import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import empservice from '../services/Userservice'
import passwordlock from './password.png'
import passwordunlock from './password-unlock.png'
const Signup = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPasswd] = useState('')
    let [userotp, setUserOtp] = useState('')
    let [showpassword, setShowPassword] = useState(false)
    let [otpclick, setOtpClick] = useState(false);
    let nameData = (e) => {
        setName(e.target.value)
    }
    let emailData = (e) => {
        setEmail(e.target.value)
    }
    let passData = (e) => {
        setPasswd(e.target.value)
    }
    let showpass = () => {
        setShowPassword(!showpassword);
    }
    let otpData =(e) => {
        setUserOtp(e.target.value);
    } 
    let navigate = useNavigate()

    const otp = async (e) => {
        let payload = { email }
        await empservice.sendOtp(payload)
        .then((res) => {
                // console.log(res)
                if (res.status === 200) {
                    alert(res.message)
                    // sign();
                } else if (res.status === 409) {
                    alert(res.message)
                    navigate('/login')

                }
            })
            setOtpClick(true);
    }

    let sign = async (e) => {
        let payload = { name, email, password, userotp }
        // console.log(payload)
        await empservice.signup(payload)
            .then((res) => {
                // console.log(res)
                if (res.status === 200) {
                    alert(res.message)
                    navigate('/seealldetails')
                }
                else if (res.status === 409) {
                    alert(res.message)
                    navigate('/seealldetails')

                }else if(res.status===401){
                    alert(res.message)
                    navigate('/')
                }
                else {
                    alert(res.message)
                    navigate('/')
                }
            })
    }
    return (
        <div id='signup'>
            <div id='signup-form'>
                <h2 id='heading'>Sign-Up Form</h2>

                <span>Name</span>
                <input type="text" placeholder='Enter Name' value={name} onChange={nameData} />

                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />
               
                {otpclick ?
                <div>
                    <span>OTP</span>
                    <input type="number" placeholder='Enter Your Otp' value={userotp} onChange={otpData} />
                </div>
                : null
                }

                <span>Password</span>
                <div id='password-contain'>
                    <input
                        type={showpassword ? 'text' : 'password'}
                        placeholder='Enter Password'
                        value={password}
                        onChange={passData}
                    />
                    <button onClick={showpass}>
                        {showpassword ? (
                            <img src={passwordunlock} alt="" />
                        ) : (
                            <img src={passwordlock} alt="" />
                        )}
                    </button>
                </div>
                {otpclick ?
                    <button onClick={sign}>Sign-Up</button>
                    :
                    <button onClick={otp}>Send Otp</button>
                }
            </div>
        </div>
    );
};

export default Signup;
