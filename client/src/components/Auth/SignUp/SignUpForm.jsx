import React, { useContext, useState } from 'react'
import SignUpContext from "@/context/Auth/SignUp/SignUpContext"
import MessagesContext from "@/context/Message/MessageContext"
import validator from "validator"

function SignUpForm() {
    // contaxt api 
    const SignUpContaxtAPI = useContext(SignUpContext);
    const MessageContext = useContext(MessagesContext);


    // inputs 
    const [EmailAddress, setEmailAddress] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPass, setConfirmPass] = useState("")
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [PhoneNum, setPhoneNum] = useState("")
    const [Company, setCompany] = useState("")

    const findValidationError = () => {
        let error = [];
        if (!validator.isEmail(EmailAddress)) {
            error.push({ type: "email", msg: "Enter Valid Email Address." })
        }
        if (!validator.isLength(Password, { min: 8 })) {
            error.push({ type: "password", msg: "Your password less greater than equal to 8." })
        }
        if (Password !== ConfirmPass) {
            error.push({ type: "Cpassword", msg: "Confirm Password Not Match." })
        }
        if (!validator.isLength(Fname, { min: 1, max: 30 })) {
            error.push({ type: "fname", msg: "Enter Valid First Name." })
        }
        if (!validator.isLength(Lname, { min: 1, max: 30 })) {
            error.push({ type: "lname", msg: "Enter Valid Last Name." })
        }
        if (!validator.isMobilePhone(PhoneNum, 'any', { strictMode: false })) {
            error.push({ type: "phone", msg: "Enter Valid Phone Number." })
        }
        return error;
    }

    const validateForm = (errorsList) => {
        // show all error messages 
        errorsList.forEach(({ type, msg }) => {
            MessageContext.danger(msg)
        })

        if (errorsList.length == 0) {
            return true;
        }
        return false;
    }

    const handleSignUpForm = (e) => {
        e.preventDefault()
        const errorsData = findValidationError();
        const isValid = validateForm(errorsData)

        //sign up here
        if (isValid) {
            SignUpContaxtAPI.CreateUser({ EmailAddress, Password, ConfirmPass, Fname, Lname, PhoneNum, Company })
        }
    }

    return (
        <form className="max-w-md mx-auto my-16 bg-slate-900 p-5 rounded-lg">
            <h1 className='my-3 mb-5 text-3xl font-bold text-white'>Sign Up</h1>
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="floating_email" id="floating_email" className="signup-input  peer" placeholder=" " value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="floating_password" id="floating_password" className="signup-input peer" placeholder=" " value={Password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="repeat_password" id="floating_repeat_password" className="signup-input peer" placeholder=" " value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_first_name" id="floating_first_name" className="signup-input peer" placeholder=" " value={Fname} onChange={(e) => setFname(e.target.value)} />
                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_last_name" id="floating_last_name" className="signup-input peer" placeholder=" " value={Lname} onChange={(e) => setLname(e.target.value)} />
                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="signup-input peer" placeholder=" " value={PhoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_company" id="floating_company" className="signup-input peer" placeholder=" " value={Company} onChange={(e) => setCompany(e.target.value)} />
                    <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                </div>
            </div>
            <button onClick={handleSignUpForm} className="btn">Sign Up</button>
        </form>
    )
}

export default SignUpForm