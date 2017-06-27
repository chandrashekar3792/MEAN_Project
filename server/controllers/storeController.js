const mongoose = require('mongoose');
const Store=require('../models/Store');

exports.homePage=(req,res)=>{
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  console.log('req.name',req.name);
}

exports.myMiddleware=(req,res,next)=>{
  req.name='Chandru';
  res.cookie('name','Chandru',{age:24});
  next();
}

//Request types exaples
//We capture the request from client in three ways
//1.req.body
//2.req.query
//3.req.params
exports.requestExample=(req, res) => {
  //res.send('Hey! It works!');

  //if you want to send data in JSON format
  //const details={name:'chandru',age:100,cool:true};
  //res.json(details);

  // if you want to get parameters passed to api
  // using req.query
  res.json(req.query);
}

exports.reverseQueryParameters=(req,res)=>{
  //res.send('it works');
  const reverse=[...req.params.name].reverse().join('');
  req.flash('info','Something happended');
  req.flash('error','error occured');
  req.flash('warning','some warnings');
  res.send(reverse);
}


exports.addStore= async(req,res)=>{
  //console.log('req',req.body);
  const store = new Store(req.body);
  await store.save(); // Below code doesn't executed till store.save is completed;
  req.flash('success',`Successfully created ${store.name}`);
  res.res.redirect('/');
}

exports.getStore=async (req,res)=>{
  const stores=Store.find();
  stores.exec((err,result)=>{
     console.log('stores',result);
     res.json(result);
  });
}
