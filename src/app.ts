import express, {Application} from "express";
const app: Application = express();
import cookieParser from "cookie-parser";
//const helmet = require('helmet')
import {port} from './configs/index';
import router from "./routes/index";


app.use(express.json());

// cookie-parser is a middleware which parses cookies attached to the client request 
app.use(cookieParser());

// PROTECT app from some well-known web vulnerabilities by setting HTTP headers appropriately.
//app.use(helmet())

// Reduce Fingerprinting
app.disable('x-powered-by')

// API route
app.use('/api', router);

// custom 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})
  
// custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port);
console.log("Server is in port:", port);

export default app;
