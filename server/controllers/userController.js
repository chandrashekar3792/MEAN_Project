const mongoose = require('mongoose');

exports.loginForm=(req,res)=>{
  res.render('login',{title:'login'});
}

exports.registerForm=(req,res)=>{
  res.render('register',{title:'register'});
}

exports.validateRegister=(req,res,next)=>{
  req.sanitizeBody('name');
  req.checkBody('name','You must supply a name!').notEmpty();
  req.checkBody('email','You must supply a email!').notEmpty();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots:false,
    remove_extension:false,
    gmail_remove_subaddress:false
  });
  req.checkBody('possword','Password Connot be Blank').notEmpty();
  req.checkBody('possword-confim','Password-confirm Connot be Blank').notEmpty();

  req.checkBody('Password-confirm','Oops! your password do not match').equals(req.body.password);
  const error=req.validationErrors();
  if(error){
    req.render('register',{title:'Register',body:req.body});
  }
}

exports.isLoggedIn = (req,res,next)=>{
  if(req.isAuthenticated()){
    next();
    return;
  }
  res.redirect('/login');
}
