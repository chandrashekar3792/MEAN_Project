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
    tags:[String],
    createdAt:{
      type:Date,
      default:Date.now
    },
    location:{
      type:{
        type:String,
        default:'Point'
      },
      coordinates:[{
        type:Number,
        required:'You must supply coordinates!'
      }],
      address:{
        type:String,
        required:'You must supply a addrss'
      }
    }

});

storeSchema.pre('save',function(next){
  if(!this.isModified('name')){
    next();
    return;
  }
  this.slug=slug(this.name);
  next(); //save function happens only if slug of name is done
});

storeSchema.static.getTagsList=function(){
  return this.aggregate([
    {$unwind:'$tags'},
    {$group:{_id:'$tags',count:{$sum:1}}},
    {$sort:{count:-1}}
  ]);
}
module.exports=mongoose.model('Store',storeSchema);
