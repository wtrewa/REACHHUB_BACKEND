const express = require('express')
const connection = require('./connetion')
const cors = require('cors');
const { json } = require('body-parser');
const playerRouter = require('./route/playerRoute');

const app = express()
const csvParser = require('csv-parser');
const { userRouter } = require('./route/userRoute');
const auth = require('./middleware/auth');

app.use(cors())
app.use(express.json())
app.use('/',auth,playerRouter)
app.use('/user',userRouter)


app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(8080,()=>{
    connection()
    console.log('port is running on 8080')
})


