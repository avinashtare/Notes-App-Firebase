const express = require("express")
require("dotenv").config()
const app = express();
const user = require("./routes/user")

const PORT = process.env.PORT || 5000;

// allow json 
app.use(express.json())
// user 
app.use("/api/user",user)

app.get("/", (req, res) => {
    res.send("Hello Guy..")
})

app.listen(PORT, () => {
    console.log(`App Running at http://localhost:${PORT}`)
})