import LoginContext from "./LoginContext";

const LoginProvider = (prpos) => {
    const LoginUser = (credentials) => {
        console.log(credentials)
        console.log("Users Logdin....")
    }
    return (
        <LoginContext.Provider value={{LoginUser}}>
            {prpos.children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;