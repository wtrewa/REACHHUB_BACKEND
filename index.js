const express = require('express')
const connection = require('./connetion')
const cors = require('cors');
const { json } = require('body-parser');
const playerRouter = require('./route/playerRoute');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

const app = express()
const csvParser = require('csv-parser');
const { userRouter } = require('./route/userRoute');
const auth = require('./middleware/auth');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(cors())
app.use(express.json())
app.use('/',playerRouter)
app.use('/user',userRouter)


app.get('/',(req,res)=>{
    res.send("hello world")
})

const spacs = swaggerJSDoc()
app.listen(8080,()=>{
    connection()
    console.log('port is running on 8080')
})


