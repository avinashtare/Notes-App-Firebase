import LoginOutContext from "./LogoutContext";
import { removeToken } from "@/utils/auth-session"

const LogoutProvider = (props) => {

    const LogoutUser = async () => {
        removeToken()
    }
    return (
        <LoginOutContext.Provider value={{ LogoutUser }}>
            {props.children}
        </LoginOutContext.Provider>
    )

}

export default LogoutProvider;