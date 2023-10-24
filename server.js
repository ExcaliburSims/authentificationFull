require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const { logg } = require("./controllers/authentification");
const logine = require('./routes/login.routes')

const PORT = process.env.PORT || 8080

const app = express()

// Middlewre

app.use(express.json())
app.use(cors({origin: true, credentials: true}))
app.use(logine)

app.get('/api', (req, res) => {
  res.send('<h1>salut le monde</h1>')
})
app.post('/api', (req, res) => {
  res.send('lol')
})

app.listen(PORT, () => console.log(`server running in ${PORT}`))
