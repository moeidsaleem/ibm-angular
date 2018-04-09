function crosPermission(){
  this.permission=function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',"x-access-token,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header('x-access-token','*')
    res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
    next();
  }
}

module.exports= new crosPermission();