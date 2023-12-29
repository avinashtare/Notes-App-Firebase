import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
const ServerURL = import.meta.env.VITE_SERVER_URL;
import { getToken } from "@/utils/auth-session"



const AuthProvider = (prpos) => {
    const [IsValid, setIsValid] = useState(false)

    useEffect(() => {
        CheckValidUser()
    }, [])

    const CheckValidUser = async () => {
        const token = await getToken("auth")
        const req = {
            body: {},
            method: "POST",
            headers: {
                "token": token,
            }
        }

        let response = await fetch(`${ServerURL}/` + "api/validate/user", req)
        response = await response.json()
        response.valid ? setIsValid(true) : setIsValid(false)

        return response;
    }
    return (
        <AuthContext.Provider value={{ CheckValidUser, IsValid }}>
            {prpos.children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;