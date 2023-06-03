const mongoose = require('mongoose')


// const mongoURi ="mongodb://localhost:27017/?directConnection=true"

// mongoose.connect("")


const  connectToMongo=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/inotebook?directConnection=true",

        console.log("connected")
    )
}


module.exports =connectToMongo


