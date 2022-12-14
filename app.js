const express = require("express");
const app = express();
const port = 3000;
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
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post("/get-location", async (req, res,next) => {
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
next(err);
    }

});

app.use((req, res, next) => {

    return res.status(404).json({ message: "Not Found" });
});

//error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err);
}
)