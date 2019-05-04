var express=require('express');
var app=express();
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

var data=[{"id": "0", "name": "travail" },
{"id": "1", "name": "loisir" }];

var current=2;  //Correspond à l'ID en cours qui s'incrémente quand l'utilisateur ajoute un élément*

/**
* Affichage de l'élément ayant pour ID id (passage en paramètre de l'URI)
*/
app.get('/:id', function (req, res) {
  let id=parseInt(req.params.id);
  let pos=-1;
  data.forEach(function(item, index, array) {
  if(item.id==id){
    pos=index;
  }
});
  if(pos!=-1){
    res.status(200).send(data[pos]);
  }
  else{
    res.status(404).send('Page introuvable!');
  }

});

/**
* Affichage de tous les éléments de la todo liste
*/
app.get('/',function(req,res){
  res.status(200).send(data);
});

/**
* Ajout d'un élément dans la todo en récupérant des éléments dans le corps de la requête
*/
app.post('/',function(req,res){
let name=req.body.name;
if(name!=undefined){
  let json={"id":current.toString(),"name":name};
  current++;
  data.push(json);
  res.json(json);
}
else{
  res.status(400).send("Le nom de la nouvelle catégorie n'est pas définie!")
}
})

/**
* Suppression de l'élément ayant pour id celui passé en paramètre
*/
app.delete('/:id',function(req,res){
  let id=parseInt(req.params.id);
  let pos=-1;
  data.forEach(function(item, index, array) {
  if(item.id==id){
    pos=index;
  }
});
if(pos!=-1){
  data.splice(pos, 1);  //Supprime 1 élément à partir de la position pos
  res.status(200).send("OK");
}
else{
  res.status(400).send("La catégorie sélectionnée n'existe pas!")
}
});

/**
* Modification d'un ou plusieurs éléments du todo dont l'id est précisé dans l'URI
*/
app.put('/:id',function(req,res){
  let id=parseInt(req.params.id);
  let pos=-1;
  data.forEach(function(item, index, array) {
  if(item.id==id){
    pos=index;
  }
});
if(pos!=-1){
  let name=req.body.name;
  if(name!=undefined){
    data[pos].name=name;
    res.status(200).send('OK');
  }
  else{
    res.status(200).send("Aucune Modification")
  }
}
else{
  res.status(404).send("La catégorie sélectionnée n'existe pas");
}

});


app.listen(3030);
console.log("Listening on 3030");
