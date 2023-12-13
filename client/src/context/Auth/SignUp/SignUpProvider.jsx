import SignUpContext from "./SignUpContext"

const SignUpProvider = (props) => {
  const CreateUser = (credentials) => {
    console.log(credentials)
    console.log("Users Created....")
  }
  return (
    <SignUpContext.Provider value={{CreateUser}}>
      {props.children}
    </SignUpContext.Provider>
  )

}

export default SignUpProvider;