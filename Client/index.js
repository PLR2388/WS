var express=require('express');
var parser=require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app=express();
app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json

var tags;
const invocation =new XMLHttpRequest();

function handler(evtXHR){
  if (invocation.readyState == 4){
    if (invocation.status == 200){

	try{
      		let response = JSON.parse(invocation.responseText);
          tags=response;
		console.log(response);
	}catch(err){
		console.log("invocation.responseText "+invocation.responseText);
	}

    }else{
      console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
    }
  }else{
    console.log("currently the application is at" + invocation.readyState);
  }
}

function getAllTags(){
  if(invocation){
    invocation.open('GET', 'http://localhost:3030/', true);
    invocation.onreadystatechange = handler;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}




app.get('/',function(req,res){
  res.render('main');
});

app.get('/createToDo',function(req,res){
  getAllTags();


  res.render('create',{'tags': tags});
});

app.get('/showToDo',function(req,res){
  res.render();
});

app.get('/updateToDo',function(req,res){
  res.render();
});

app.get('/deleteToDo',function(req,res){
  res.render();
});

app.listen(3031);
