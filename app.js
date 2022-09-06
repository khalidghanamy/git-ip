const express = require("express");
const app = express();
const port = 3000;
const unirest = require("unirest");
const satelize = require("satelize");
const geo = require("geoip-lite");
const cors = require('cors');
const connectToDb = require('./db');
require('dotenv').config();

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
