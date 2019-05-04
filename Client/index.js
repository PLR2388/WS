var express=require('express');
var parser=require('body-parser');
var todoss=require("./todo.js");                    //Module contenant les fonctions appellant l'API todo
var tagss=require("./tags.js");                     //Module contenant les fonctions appellant l'API tags
var app=express();
app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json

/**
* Page principal du site offrant les choix CRUB pour les deux API
*
**/
app.get('/',function(req,res){
  res.render('main');
});

/**
* Page permettant de créer une nouvelle tâche
*
**/
app.get('/createToDo',function(req,res){
  tagss.getAllTags();
  res.render('create',{'tags': tagss.getTAG()});
});

/**
* Page confirmant la création de la nouvelle tâche
*
**/
app.post('/createToDo',function(req,res){
  todoss.createAToDo(req.body.name,req.body.begin,req.body.end,req.body.tags);
  res.render('createSuccess');
});

/**
* Page affichant toutes les tâches
*
**/
app.get('/showToDo',function(req,res){
  todoss.getAllToDo();
  res.render('show',{'todos': todoss.getDO()});
});

/**
* Page permettant de choisir la tâche à modifier
*
**/
app.get('/updateToDo',function(req,res){
  todoss.getAllToDo();
  res.render('modify',{'todos':todoss.getDO()});
});

/**
* Page permettant de choisir les nouveaux paramètres d'une tâche
*
**/
app.post('/updateToDoForm',function(req,res){
  let id=req.body.todo;
  tagss.getAllTags();
  todoss.getAToDo(id);
  console.log("todomodify="+todo.title);
  res.render('modifyOne',{'tags': tagss.getTAG(),'todo':todoss.getDO()});

});

/**
* Page confirmant la modification de la tâche
*
**/
app.post('/updateSuccessTodo',function(req,res){
  let id=req.body.id;
  let title=req.body.title;
  let dateBegin=req.body.dateBegin;
  let dateEnd=req.body.dateEnd;
  let tags=req.body.tags;
  todoss.updateToDo(id,title,dateBegin,dateEnd,tags);
  res.render('modifySucess');
});

/**
* Page permettant de sélectionner la tâche à supprimer
*
**/
app.get('/deleteToDo',function(req,res){
    todoss.getAllToDo();
  res.render('delete',{'todos':todoss.getDO()});
});

/**
* Page confirmant la suppression d'une tâche
*
**/
app.post('/deleteToDo',function(req,res){ //Fonctionne
  todoss.deleteAToDo(req.body.todo);
  res.render('deleteSuccess');
});

/**
* Page permettant d'ajouter une nouvelle catégorie
*
**/
app.get('/createTags',function(req,res){
res.render('createTags');
});

/**
* Page confirmant la création d'une nouvelle catégorie
*
**/
app.post('/createTags',function(req,res){
  console.log("name="+req.body.name);
  tagss.createATag(req.body.name);
  res.render('createTagsSuccess');
});

/**
* Page affichant l'ensemble des catégories
*
**/
app.get('/showTags',function(req,res){
  tagss.getAllTags();
  res.render('showTags',{'tags': tagss.getTAG()});
});

/**
* Page permettant de choisir la catégorie à modifier
*
**/
app.get('/updateTags',function(req,res){
  tagss.getAllTags();
  res.render('modifyTag',{'tags':tagss.getTAG()});
});

/**
* Page permettant de modifier le nom d'une catégorie
*
**/
app.post('/updateTagForm',function(req,res){
  let id=req.body.tag;
  console.log("id="+id);
  tagss.getATag(id);
  res.render('modifyOneTag',{'tag':tagss.getTAG()});
});

/**
* Page confirmant la modification du nom de la catégorie
*
**/
app.post('/updateSuccessTag',function(req,res){
  let name=req.body.name;
  let id=req.body.id;
  tagss.updateTag(id,name);
  res.render('modifyTagSucess');
});

/**
* Page permettant de choisir la tâche à supprimer
*
**/
app.get('/deleteTags',function(req,res){
  tagss.getAllTags();
res.render('deleteTag',{'tags':tagss.getTAG()});
});

/**
* Page confirmant la suppression de la catégorie
*
**/
app.post('/deleteTags',function(req,res){ //Fonctionne
  tagss.deleteATag(req.body.tag);
  res.render('deleteTagSuccess');
});


app.listen(3031);
console.log("Listening on 3031")
