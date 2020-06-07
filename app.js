const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const middleware = require("./middleware")
const api = require('./api')

const app = express()

app.use(morgan("dev"))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Wooow"
    })
})

app.use("/api", api)

app.use(middleware.notFound)
app.use(middleware.errorHandler)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});