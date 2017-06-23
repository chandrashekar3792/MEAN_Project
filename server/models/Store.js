const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const slug=require('slugs');

const storeSchema= new mongoose.Schema({
    name:{
      type:String,
      trim:true,//to remove white spece
      required:'Please enter a store name!'
    },
    slug:String,
    description:{
      type:String,
      trim:true
    },
    tags:[String]
});

storeSchema.pre('save',function(next){
  if(!this.isModified('name')){
    next();
    return;
  }
  this.slug=slug(this.name);
  next(); //save function happens only if slug of name is done
});

module.exports=mongoose.model('Store',storeSchema);
