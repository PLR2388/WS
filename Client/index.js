var express=require('express');
var parser=require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app=express();
app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json

var tags={};
var todo={};
var invocation =new XMLHttpRequest();

function handlerTags(evtXHR){
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

function handlerTodos(evtXHR){
  if (invocation.readyState == 4){
    if (invocation.status == 200){

	try{
      		let response = JSON.parse(invocation.responseText);
          todo=response;
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
  //var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:3030/', false);
    invocation.onreadystatechange = handlerTags;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function getAllToDo(){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/todo', false);
    invocation.onreadystatechange = handlerTodos;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function getAToDo(id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    console.log('http://localhost:8080/todo/'+id);
    invocation.open('GET', 'http://localhost:8080/todo/'+id, true);
    invocation.onreadystatechange = handlerTodos;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function deleteAToDo(id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    console.log('http://localhost:8080/todo/'+id);
    invocation.open('DELETE', 'http://localhost:8080/todo/'+id, true);
    invocation.onreadystatechange = handlerTodos;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function createAToDo(title,dateBegin,dateEnd,tags){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let task={title: 'title.toString()' ,dateBegin: 'dateBegin.toString()', dateEnd: 'dateEnd.toString()', tags : 'tags.toString()' };
    invocation.open('POST', 'http://localhost:8080/todo', true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = handlerTodos;
    invocation.send(JSON.stringify(task));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function createATag(title){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={name: title };
    invocation.open('POST', 'http://localhost:3030', true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = handlerTags;
      console.log("invocation="+invocation);
    invocation.send(JSON.stringify(tag));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

function getATag(id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    console.log('http://localhost:3030/'+id);
    invocation.open('GET', 'http://localhost:3030/'+id, true);
    invocation.onreadystatechange = handlerTags;
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

app.post('/createToDo',function(req,res){
  console.log("name="+req.body.name);
  console.log("begin="+req.body.begin);
  console.log("end="+req.body.end);
  console.log("tags="+req.body.tags);
  createAToDo(req.body.name,req.body.begin,req.body.end,req.body.tags);
  res.render('createSuccess');
});

app.get('/showToDo',function(req,res){
  getAllToDo();
  res.render('show',{'todos': todo});
});

app.get('/updateToDo',function(req,res){
  getAllToDo();
  res.render('modify',{'todos':todo});
});

app.post('/updateToDoForm',function(req,res){
  let id=req.body.todo;
  console.log("id="+id);
  getAToDo(id);
  getAllTags();
  res.render('modifyOne',{'todo':todo, 'tags': tags});
});

app.get('/deleteToDo',function(req,res){
    getAllToDo();
  res.render('delete',{'todos':todo});
});

app.post('/deleteToDo',function(req,res){ //Fonctionne
  deleteAToDo(req.body.todo);
  res.render('deleteSuccess');
});

app.get('/createTags',function(req,res){
res.render('createTags');
});

app.post('/createTags',function(req,res){
  console.log("name="+req.body.name);
  createATag(req.body.name);
  res.render('createTagsSuccess');
});

app.get('/showTags',function(req,res){
  getAllTags();
  res.render('showTags',{'tags': tags});
});

app.get('/updateTags',function(req,res){
  getAllTags();
  res.render('modifyTag',{'tags':tags});
});

app.post('/updateTagForm',function(req,res){
  let id=req.body.tag;
  console.log("id="+id);
  getATag(id);
  res.render('modifyOneTag',{'tag':tags});
});

app.get('/deleteTags',function(req,res){
  getAllTags();
res.render('deleteTag',{'tags':tags});
});

app.post('/deleteTags',function(req,res){ //Fonctionne
  deleteAToDo(req.body.tag);
  res.render('deleteTagSuccess');
});


app.listen(3031);
console.log("Listening on 3031")
