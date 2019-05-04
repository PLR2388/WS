var express=require('express');
var parser=require('body-parser');
var todoss=require("./todo.js");
var tagss=require("./tags.js");
console.log(todoss);
var app=express();
app.set('view engine', 'ejs');											//Choix de ejs comme moteur de template
app.use(express.static(__dirname + '/public'));			//Permet de rendre un répertoire public afin de pouvoir y lire les fichier js et css
app.use(parser.urlencoded({ extended: true }));			//Autorise le découpage de l'url
app.use(parser.json());															//Autorise le découpage de json


app.get('/',function(req,res){
  res.render('main');
});

app.get('/createToDo',function(req,res){
  tagss.getAllTags();
  res.render('create',{'tags': tagss.getTAG()});
});

app.post('/createToDo',function(req,res){
  todoss.createAToDo(req.body.name,req.body.begin,req.body.end,req.body.tags);
  res.render('createSuccess');
});

app.get('/showToDo',function(req,res){
  todoss.getAllToDo();
  res.render('show',{'todos': todoss.getDO()});
});

app.get('/updateToDo',function(req,res){
  todoss.getAllToDo();
  res.render('modify',{'todos':todoss.getDO()});
});

app.post('/updateToDoForm',function(req,res){
  let id=req.body.todo;
  tagss.getAllTags();
  todoss.getAToDo(id);
  console.log("todomodify="+todo.title);
  res.render('modifyOne',{'tags': tagss.getTAG(),'todo':todoss.getDO()});

});

app.get('/deleteToDo',function(req,res){
    todoss.getAllToDo();
  res.render('delete',{'todos':todoss.getDO()});
});

app.post('/deleteToDo',function(req,res){ //Fonctionne
  todoss.deleteAToDo(req.body.todo);
  res.render('deleteSuccess');
});

app.get('/createTags',function(req,res){
res.render('createTags');
});

app.post('/createTags',function(req,res){
  console.log("name="+req.body.name);
  tagss.createATag(req.body.name);
  res.render('createTagsSuccess');
});

app.get('/showTags',function(req,res){
  tagss.getAllTags();
  res.render('showTags',{'tags': tagss.getTAG()});
});

app.get('/updateTags',function(req,res){
  tagss.getAllTags();
  res.render('modifyTag',{'tags':tagss.getTAG()});
});

app.post('/updateTagForm',function(req,res){
  let id=req.body.tag;
  console.log("id="+id);
  tagss.getATag(id);
  res.render('modifyOneTag',{'tag':tagss.getTAG()});
});

app.post('/updateSuccessTag',function(req,res){
  let name=req.body.name;
  let id=req.body.id;
  tagss.updateTag(id,name);
  res.render('modifyTagSucess');
});

app.post('/updateSuccessTodo',function(req,res){
  let id=req.body.id;
  let title=req.body.title;
  let dateBegin=req.body.dateBegin;
  let dateEnd=req.body.dateEnd;
  let tags=req.body.tags;
  todoss.updateToDo(id,title,dateBegin,dateEnd,tags);
  res.render('modifySucess');
});

app.get('/deleteTags',function(req,res){
  tagss.getAllTags();
res.render('deleteTag',{'tags':tagss.getTAG()});
});

app.post('/deleteTags',function(req,res){ //Fonctionne
  tagss.deleteATag(req.body.tag);
  res.render('deleteTagSuccess');
});


app.listen(3031);
console.log("Listening on 3031")
