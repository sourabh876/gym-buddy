// const express = require('express');
// const dotenv = require("dotenv")
// const mongoose = require("mongoose")
// const cors = require("cors")


// const getworkouts = require("./routes/workouts")
// const userRoutes = require('./routes/users')

// dotenv.config()

// const app = express()
// app.use(express.json())

//adding cors

// app.use(cors({
//   origin: 'https://gym-buddy-frontend-seven.vercel.app',
//   credentials: true // only if you're using cookies or auth headers
// }));


// // app.use(express.json())

// const PORT = process.env.PORT

// mongoose.connect(process.env.MONGO_URI).
//     then(() => {
//         app.listen(PORT, () => {
//             console.log(`server is running at http://localhost:${PORT} & db is connected`)
//         })
//     }).
//     catch((error) => { console.log(error) })



// app.get("/", (req, res) => {
//     res.send({
//         activeStatus : true,
//         error: false,
//     })
// })

// app.use("/api/workouts", getworkouts)
// app.use("/api/user", userRoutes)


// ...existing code...
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const getworkouts = require("./routes/workouts")
const userRoutes = require("./routes/users")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('MONGO_URI is missing in backend/.env')
    process.exit(1)
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.use("/api/workouts", getworkouts)
        app.use("/api/user", userRoutes)

        app.get("/", (req, res) => {
            res.json({ activeStatus: true, error: false })
        })

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT} & DB connected`)
        })
    })
    .catch((err) => {
        console.error('Mongo connection error:', err)
        process.exit(1)
    })
// ...existing code...