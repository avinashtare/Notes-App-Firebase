import LoginContext from "./LoginContext";
const ServerURL = import.meta.env.VITE_SERVER_URL;
import { setToken } from "@/utils/auth-session"

const LoginUserRequest = async (credentials) => {
    const req = {
        body: credentials,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }
    let response = await fetch(`${ServerURL}/` + "api/user/login", req)
    response = response.json()

    return response;
}

const LoginProvider = (prpos) => {

    const LoginUser = async (credentials) => {
        const UserCredentialsData = { email: credentials.EmailAddress, password: credentials.Password }
        const UserCredentials = JSON.stringify(UserCredentialsData);
        const LoginResponse = await LoginUserRequest(UserCredentials);
        // set auth token 
        try {
            let token = LoginResponse.data.token;
            // handle all request form here
            if (token) {
                setToken(token)
                return { Login: true };
            }
        } catch (error) { }

        return { Login: false, errors: LoginResponse.error };

    }
    return (
        <LoginContext.Provider value={{ LoginUser }}>
            {prpos.children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;