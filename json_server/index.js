const express = require('express')
const app = express()
const router =require ('../json_server/modules/user/user.router')
require('dotenv').config()
const port = process.env.port
var cors = require('cors')



app.use(cors())


app.use(express.json())

app.use(router)
app.get('/', (req, res) => res.send('Hello World!'))
// app.use('/api/v1',api)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
