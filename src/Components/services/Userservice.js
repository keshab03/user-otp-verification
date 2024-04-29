import axios from 'axios';
import { url } from '../../config';

const baseUrl = url;

const Employeeservice = {


    getallemployee: async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/getnum`);

            if (response.data.employee.length > 0) {
                console.log('Getting Employee To Show Numbers');
                return response.data.employee;
            } else {
                console.log("No employee data.");
                return null; // Return null or handle the case where no employees are present
            }
        } catch (error) {
            console.log(error.response.data.error);
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error.message);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },

    sendOtp: async (sdata) => {
        try {
            const response = await axios.post(`${baseUrl}/user/sendotp`, sdata);
            console.log("Otp Responce => ", response)
            console.log('Otp sent  successfully');
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while SignUp");
            }
        }
    },

    signup: async (sdata) => {
        try {
            const response = await axios.post(`${baseUrl}/user/signup`, sdata);
            console.log("SignUp Responce => ", response)
            console.log('Sign-Up Successfull');
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while SignUp");
            }
        }
    },

 

    login: async (ldata) => {
        try {
            const response = await axios.post(`${baseUrl}/user/login`, ldata);
            console.log(response)
            if (response.data !== 200) {
                console.log('Login Faid')
            } else {
                console.log('Login Successfull');
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while Login");
            }
        }
    },


}
export default Employeeservice;
