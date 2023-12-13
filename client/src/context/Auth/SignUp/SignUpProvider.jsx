import SignUpContext from "./SignUpContext"
import { setToken } from "@/utils/auth-session"
const ServerURL = import.meta.env.VITE_SERVER_URL;

const registerUser = async (credentials) => {
  const req = {
    body: credentials,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  }
  let response = await fetch(`${ServerURL}/` + "api/user/register", req)
  response = response.json()

  return response;
}

const SignUpProvider = (props) => {
  const CreateUser = async (credentials) => {
    const UserCredentialsData = { email: credentials.EmailAddress, password: credentials.Password, first: credentials.Fname, last: credentials.Lname, phone: credentials.PhoneNum, company: credentials.Company }

    // console.log(credentials)
    const UserCredentials = JSON.stringify(UserCredentialsData);

    const registerResponse = await registerUser(UserCredentials);

    // set auth token 
    try {
      let token = registerResponse.data.token;
      // handle all request form here
      if (token) {
        setToken(token)
        return { SignUp: true };
      }
    } catch (error) { }

    return { SignUp: false, errors: registerResponse.error };

  }
  return (
    <SignUpContext.Provider value={{ CreateUser }}>
      {props.children}
    </SignUpContext.Provider>
  )

}

export default SignUpProvider;