import React, { useContext, useState } from 'react'
import LoginContext from "@/context/Auth/Login/LoginContext"
import MessagesContext from "@/context/Message/MessageContext"
import validator from 'validator'

function LoginForm() {
  const MessageContext = useContext(MessagesContext);
  const LoginContexts = useContext(LoginContext)
  // inputs 
  const [EmailAddress, setEmailAddress] = useState("")
  const [Password, setPassword] = useState("")

  const findValidationError = () => {
    let error = [];
    if (!validator.isEmail(EmailAddress)) {
      error.push({ type: "email", msg: "Enter Valid Email Address." })
    }
    if (!validator.isLength(Password, { min: 1 })) {
      error.push({ type: "password", msg: "Your password less greater than equal to 8." })
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

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const errorsData = findValidationError();
    const isValid = validateForm(errorsData)

    // loading here
    if (isValid) {
      LoginContexts.LoginUser({ EmailAddress, Password })
    }
  }
  return (
    <>
      <form className="max-w-md mx-auto my-16 bg-slate-900 p-5 rounded-lg">
        <h1 className='my-3 mb-5 text-3xl font-bold text-white'>Login</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>

        <button onClick={handleLoginSubmit} className="btn">Login</button>
      </form>
    </>
  )
}

export default LoginForm