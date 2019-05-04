var express=require('express');
var app=express();
var tag=require("./tag.js");
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

let tag1=new tag("0","travail");
let tag2=new tag("1","loisir");
var data=[tag1,tag2];

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
app.get('/:id', function (req, res) {

  let id=parseInt(req.params.id);
  let pos=correspondance(id);

  if(pos!=-1){
    res.status(200).send(JSON.stringify(data[pos]));
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
  //let json={"id":current.toString(),"name":name};
  let tagy=new tag(current.toString(),name);
  current++;
  data.push(tagy);
  res.status(200).send("OK");
}
else{
  res.status(400).send("Le nom de la nouvelle catégorie n'est pas définie!")
}
})

/**
* Suppression de l'élément ayant pour id celui passé en paramètre
*/
app.delete('/:id',function(req,res){
  /**Trouve la position dans le tableau correspond à l'ID **/
  let id=parseInt(req.params.id);
  let pos=correspondance(id);
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
  /**Trouve la position dans le tableau correspond à l'ID **/
  let id=parseInt(req.params.id);
  let pos=correspondance(id);
  if(pos!=-1){
  let name=req.body.name;
  if(name!=undefined){
    data[pos].setName(name);
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
