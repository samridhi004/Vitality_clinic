const mongoose = require('mongoose')

    try {
        mongoose.set('strictQuery', false)
        mongoose.connect("mongodb://127.0.0.1:27017/clinic_db") 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }

