//Imports
var express=require('express');

//Instantiate Serveur
var server=express();

//Configure route
server.get('/',function(req,res){
  res.setHeader('Content-Type','text/html');
  res.status(200).send('LOL');
});

//lauch server
server.listen(3030,function(){
  console.log('Serveur en écoute :)');
});
