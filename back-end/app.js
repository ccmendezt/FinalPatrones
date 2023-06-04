const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

const app = express()

app.use(cors());

//Seteamos motor de plantillas
app.set('view engine', 'ejs')

//Para trabajar con archivos estaticos
app.use(express.static('public'))

//Para procesar datos desde formularios
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Para trabajar con variables de entorno
dotenv.config({ path: './env/.env' })

//Para trabajar con cookies
app.use(cookieParser())

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.send('Hello World!')
})

app.use('/api', require('./routes/router'))

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})