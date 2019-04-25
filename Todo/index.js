var express=require('express');
var app=express();
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

var data=[{"id": "0", "title": "Finir le projet JEE","dateBegin": "20/03/2018", "dateEnd": "11/04/2018", "tags" : "travail" },
{"id": "1", "title": "Réviser pour le DS d'IA","dateBegin": "10/04/2018", "dateEnd": "11/04/2018", "tags" : "travail" }];

var current=2;  //Correspond à l'ID en cours qui s'incrémente quand l'utilisateur ajoute un élément*

/**
* Affichage de l'élément ayant pour ID id (passage en paramètre de l'URI)
*/
app.get('/todo/:id', function (req, res) {
  let id=req.params.id;
  console.log(id);
  res.send(data[id]);
});

/**
* Affichage de tous les éléments de la todo liste
*/
app.get('/todo',function(req,res){
  res.send(data);
});

/**
* Ajout d'un élément dans la todo en récupérant des éléments dans le corps de la requête
*/
app.post('/todo',function(req,res){
let title=req.body.title;
let dateBegin=req.body.dateBegin;
let dateEnd=req.body.dateEnd;
let statut="en cours"
let tags=req.body.tags;
console.log("title if find="+title);
if(title!=undefined && dateBegin!=undefined && dateEnd!=undefined && statut!=undefined && tags!=undefined){
  let json={"id":current.toString(),"title":title, "dateBegin":dateBegin, "dateEnd": dateEnd, "tags":tags};
  current++;
  data.push(json);
  res.send("DONE");
}
else{
  res.send("ERROR");
}
})

/**
* Suppression de l'élément ayant pour id celui passé en paramètre
*/
app.delete('/todo/:id',function(req,res){
  let pos=-1;
  data.forEach(function(item, index, array) {
  if(item.id==req.params.id){
    pos=index;
  }
});
if(pos!=-1){
  data.splice(pos, 1);
  res.send("SUCCESS");
}
else{
  res.send("ECHEC");
}
});

/**
* Modification d'un ou plusieurs éléments du todo dont l'id est précisé dans l'URI
*/
app.put('/todo/:id',function(req,res){
  let pos=-1;
  data.forEach(function(item, index, array) {
  if(item.id==req.params.id){
    pos=index;
  }
});
if(pos!=-1){
  let title=req.body.title;
  let dateBegin=req.body.dateBegin;
  let dateEnd=req.body.dateEnd;
  let statut=req.body.statut;
  let tags=req.body.tags;
  if(title!=undefined){
    data[pos].title=title;
  }
  if(dateBegin!=undefined){
    data[pos].dateBegin=dateBegin;
  }
  if(dateEnd!=undefined){
    data[pos].dateEnd=dateEnd;
  }
  if(statut!=undefined){
    data[pos].statut=statut;
  }
  if(tags!=undefined){
    data[pos].tags=tags;
  }
  res.send("SUCCESS");
}
else{
  res.send("ECHEC");
}

});


app.listen(8080);
console.log("Listening on 8080/todo")
