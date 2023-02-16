const mongoose = require(`mongoose`)

let usersSchema = new mongoose.Schema(
   {
        name: {type: String, required:true},
        email: {type: String, required:true, validate:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/},
        password: {type: String,required:true},        
        accessLevel: {type: Number, default:parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)}
   },
   {
       collection: `Users`
   })

module.exports = mongoose.model(`Users`, usersSchema)