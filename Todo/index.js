var express=require('express');
var app=express();
var todo=require("./todo.js");
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
let tache1=new todo("0","Finir le projet JEE","2018-03-20","2018-04-11","travail");
let tache2=new todo("1","Réviser pour le DS d'IA","2018-04-10","2018-04-11","travail");
var data=[tache1,tache2];

var current=2;  //Correspond à l'ID en cours qui s'incrémente quand l'utilisateur ajoute un élément*

/**
*Trouve la position dans le tableau correspond à l'ID
**/
function correspondance(id){
  let pos=-1;
  data.forEach(function(item, index, array) {
  if(item.getId()==id){
    pos=index;
  }
});
return pos;
}
/**
* Affichage de l'élément ayant pour ID id (passage en paramètre de l'URI)
*/
app.get('/todo/:id', function (req, res) {
  /**Trouve la position dans le tableau correspond à l'ID **/
  let id=parseInt(req.params.id);
  let pos=correspondance(id);
if(pos!=-1){
  res.status(200).send(JSON.stringify(data[pos]));
}
else{
  res.status(404).send('Page indisponible!');
}

});

/**
* Affichage de tous les éléments de la todo liste
*/
app.get('/todo',function(req,res){
  res.status(200).send(data);
});

/**
* Ajout d'un élément dans la todo en récupérant des éléments dans le corps de la requête
*/
app.post('/todo',function(req,res){
let title=req.body.title;
let dateBegin=req.body.dateBegin;
let dateEnd=req.body.dateEnd;
let tags=req.body.tags;
if(title!=undefined && dateBegin!=undefined && dateEnd!=undefined && tags!=undefined){
  let tache=new todo(current.toString(),title,dateBegin,dateEnd,tags);
  //let json={"id":current.toString(),"title":title, "dateBegin":dateBegin, "dateEnd": dateEnd, "tags":tags};
  current++;
  data.push(tache);
  res.status(200).send("OK");
}
else{
  res.status(400).send("Une erreur s'est produite");
}
})

/**
* Suppression de l'élément ayant pour id celui passé en paramètre
*/
app.delete('/todo/:id',function(req,res){
  /**Trouve la position dans le tableau correspond à l'ID **/
  let id=parseInt(req.params.id);
  let pos=correspondance(id);
if(pos!=-1){
  data.splice(pos, 1);
  res.status(200).send("OK");
}
else{
  res.status(400).send("La tâche sélectionnée n'existe pas!");
}
});

/**
* Modification d'un ou plusieurs éléments du todo dont l'id est précisé dans l'URI
*/
app.put('/todo/:id',function(req,res){
  /**Trouve la position dans le tableau correspond à l'ID **/
  let id=parseInt(req.params.id);
  let pos=correspondance(id);
if(pos!=-1){
  let title=req.body.title;
  let dateBegin=req.body.dateBegin;
  let dateEnd=req.body.dateEnd;
  let tags=req.body.tags;
  if(title!=undefined){
    data[pos].setTitle(title);
  }
  if(dateBegin!=undefined){
    data[pos].setdateBegin(dateBegin);
  }
  if(dateEnd!=undefined){
    data[pos].setdateEnd(dateEnd);
  }
  if(tags!=undefined){
    data[pos].setTags(tags);
  }
  res.status(200).send("OK");
}
else{
  res.status(400).send("La tâche sélectionnée n'existe pas!");
}

});


app.listen(8080);
console.log("Listening on 8080/todo")
