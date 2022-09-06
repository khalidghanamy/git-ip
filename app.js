const express = require("express");
const app = express();
const port = 3000;
const unirest = require("unirest");
const satelize = require("satelize");
const geo = require("geoip-lite");
const cors = require('cors');
const connectToDb = require('./db');
require('dotenv').config();
const path = require('path');
const {fileURLToPath} = require('url');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

//==== Create server =============================
const appPort = process.env.PORT || 4000;
const server = () => {
    app.listen(appPort, () => { console.log(`Server is running on port ${appPort} `); })
}
connectToDb(process.env.MONGO_URI, server);
const User = require('./users');

app.post("/get-location", async (req, res) => {
    console.log(req.body);

    let remoteAddress = req.connection.remoteAddress;

    let data = {
        ip: req.header('x-forwarded-for') || remoteAddress.split(":")[3],
        name: req.body.name
    }
    try {
        let user = new User(data);
        console.log(user);
        let newUser = await user.save();
        console.log(newUser);
        res.send(user);
    } catch (err) {
        console.log(err);

    }

});

//====> Deployment <========================================

const __filename = fileURLToPath(import.meta.url);

let __dirname = path.dirname(__filename);
// const dirname = __dirname.split("/")
// console.log(dirname.pop());
//  __dirname =dirname.join("/");

console.log('directory-name 👉️', __dirname);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname)));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"/index.html"));
        // console.log(path.resolve(__dirname,"client","build","index.html"));
    } 
    ) 
}