import NotesProvider from "./Notes/NotesProvider"
import MessageProvider from "./Message/MessageProvider"
import SignUpProvider from "./Auth/SignUp/SignUpProvider"
import LoginProvider from "./Auth/Login/LoginProvider"

function ContaxtAPI(props) {
    return (
        <>
            <MessageProvider>
                <NotesProvider>
                    <SignUpProvider>
                        <LoginProvider>
                        {props.children}
                        </LoginProvider>
                    </SignUpProvider>
                </NotesProvider>
            </MessageProvider>
        </>
    )
}

export default ContaxtAPI