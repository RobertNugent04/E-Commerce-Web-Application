const mongoose = require(`mongoose`)

let commentSchema = new mongoose.Schema(
   {
        shoeName: {type: String, required:false,unique:true },
        comments:{type:Object,required:false},
        userName: {type:Object, required:false}

   },
   {
       collection: `Comments`
   })

module.exports = mongoose.model(`Comments`, commentSchema)