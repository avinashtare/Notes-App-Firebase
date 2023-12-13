const express = require("express")
require("dotenv").config()
const app = express();
const user = require("./routes/user")
const validate = require("./routes/validate")
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({}));

// allow json 
app.use(express.json())
// user 
app.use("/api/user", user);

// validate user 
app.use("/api/validate", validate);




app.get("/", (req, res) => {
    res.send("Hello Guy..")
})

app.listen(PORT, () => {
    console.log(`App Running at http://localhost:${PORT}`)
})