const express = require("express")
require("dotenv").config()
const app = express();
const mainRouts = require("./routes/index")
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({origin: "*"}));

// allow json 
app.use(express.json())

// all routes
app.use("/", mainRouts)


// Home route
app.get("/", (req, res) => {
    res.send("This App is Running.....")
})

app.listen(PORT, () => {
    console.log(`App Running at http://localhost:${PORT}`)
})