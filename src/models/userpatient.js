const mongoose = require('mongoose')
const validator = require('validator')


const patientSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:3
    },
    lastname:{
        type:String,
        required:true,
        minLength:3
    },


    phone:{
        type:String,
        required:true,
        min:10,
        unique:true,
    
    },
   
    gender:{
       type:String,
       required:true
    }
})
const Pat = mongoose.model("Pat",patientSchema);

module.exports = Pat;