import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import router from './routers/index.routes.js';
import {__dirname} from "./utils.js";
import RouterMoking from './routers/mokingProduct.routes.js';
import { addLogger } from './utils/logger.js';
import swaggerJSDOc from 'swagger-jsdoc';
import multer from 'multer';
import swaggerUiExpress from 'swagger-ui-express'
const whitelist = ["http://127.0.0.1:5173", "http://localhost:5173"];

const corsOptions = {
 origin:function(origin,callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback (null,true)
 }else {
    callback(new Error ("Acceso denegado"))
 }
 },
 credentials: true,
}

const app = express();
const PORT = process.env.PORT || 8081

const swaggerOptions = {
   definition: {
    openapi: '3.1.0',
    info: {
        title: "documentencion del curso de Backend",
        description: "API Coder Backend"
    },
   },
   apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDOc (swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve,swaggerUiExpress.setup (specs))
//BDD
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BDD conectada')
    })
    .catch(() => console.log('Error en conexion a BDD'))


const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
        console.log(`\t3). http://localhost:${PORT}/api/users`);
    }
    catch (err) {
        console.log(err);
    }
});



app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser (process.env.SIGNED_COOKIE));
app.use (session({
    store: MongoStore.create ({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedtopology:true
        },
        ttl: 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

initializePassport ()
app.use(passport.initialize())
app.use(passport.session())


//Routes

app.use ('/', router)

//Routes Logger

app.use(addLogger)

app.get('/info', (req,res) => { 
    req.logger.info("Info")
    res.send("Hola")
})

app.get('/warning', (req,res) => { 
    req.logger.warning("warning")
    res.send("Hola")
})

app.get('/error', (req,res) => { 
    req.logger.error("error")
    res.send("Hola")
})

app.get('/fatal', (req,res) => { 
    req.logger.fatal("fatal")
    res.send("Hola")
})


const profileStorage = multer.diskStorage({
    destination: 'uploads/profiles/',
    filename: (req, file, cb) => {
      // Lógica para generar nombre de archivo único
      cb(null, file.originalname);
    }
  });
  
  const productStorage = multer.diskStorage({
    destination: 'uploads/products/',
    filename: (req, file, cb) => {
      // Lógica para generar nombre de archivo único
      cb(null, file.originalname);
    }
  });
  
  const documentsStorage = multer.diskStorage({
    destination: 'uploads/documents/',
    filename: (req, file, cb) => {
      // Lógica para generar nombre de archivo único
      cb(null, file.originalname);
    }
  });
  
  const uploadProfile = multer({ storage: profileStorage });
  const uploadProduct = multer({ storage: productStorage });
  const uploadDocuments = multer({ storage: documentsStorage });