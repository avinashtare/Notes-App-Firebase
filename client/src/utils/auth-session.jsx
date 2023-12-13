const setToken = (value) => {
    return sessionStorage.setItem("auth", value)
}
const getToken = () => {
    return sessionStorage.getItem("auth")
}
const removeToken = () => {
    return sessionStorage.removeItem("auth")
}

export { setToken, getToken, removeToken }