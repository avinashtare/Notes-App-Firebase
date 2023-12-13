import NotesProvider from "./Notes/NotesProvider"
import MessageProvider from "./Message/MessageProvider"
import SignUpProvider from "./Auth/SignUp/SignUpProvider"
import LoginProvider from "./Auth/Login/LoginProvider"
import AuthProvider from "./Auth/Auth/AuthProvider"
import LogoutProvider from "./Auth/Logout/LogoutProvider"

function ContaxtAPI(props) {
    return (
        <>
            <MessageProvider>
                <AuthProvider>
                    <NotesProvider>
                        <SignUpProvider>
                            <LoginProvider>
                                <LogoutProvider>
                                    {props.children}
                                </LogoutProvider>
                            </LoginProvider>
                        </SignUpProvider>
                    </NotesProvider>
                </AuthProvider>
            </MessageProvider>
        </>
    )
}

export default ContaxtAPI
