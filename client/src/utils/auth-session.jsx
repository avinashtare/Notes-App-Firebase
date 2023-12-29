const setToken = async (value) => {
    try {
        return await window.cookieStore.set("auth", value);
    } catch (error) { return false; }
}
const getToken = async () => {
    try {
        let cookieData = await window.cookieStore.get("auth")
        return cookieData.value;

    } catch (error) { return false; }
}
const removeToken = async () => {
    try {
        return await window.cookieStore.delete("auth");
    } catch (error) { return false; }
}

export { setToken, getToken, removeToken }