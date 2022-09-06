
const mongoose = require('mongoose')

const connectToDb = async (url,server)=>{
    try{
     mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    });
    console.log("Connected to database...");
    //== call server ==
    server();
}catch(err){
    throw new Error(err);
}
}

module.exports = connectToDb;