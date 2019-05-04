var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var invocation=new XMLHttpRequest();
var todo={};

exports.getDO = function() {
  return todo;
};

exports.getAllToDo = function(){
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/todo', false);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

      try{
              todo = JSON.parse(invocation.responseText);

      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.getAToDo =function(id){
  invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('GET', 'http://localhost:8080/todo/'+id, false);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

      try{
              todo = JSON.parse(invocation.responseText);

      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.deleteAToDo = function (id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('DELETE', 'http://localhost:8080/todo/'+id, true);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

      try{
              todo = JSON.parse(invocation.responseText);

      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.createAToDo= function (title,dateBegin,dateEnd,tags){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let task={title: title ,dateBegin: dateBegin, dateEnd: dateEnd, tags : tags };
    invocation.open('POST', 'http://localhost:8080/todo', true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

      try{
              todo = JSON.parse(invocation.responseText);
      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(JSON.stringify(task));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.updateToDo= function (id,title,dateBegin,dateEnd,tags){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let todo;
    if(title!=undefined && title!=""){
      if(dateBegin!=undefined && dateBegin !=""){
        if(dateEnd!=undefined && dateEnd!=""){
          todo={"id":id, "title": title, "dateBegin": dateBegin, "dateEnd": dateEnd, "tags":tags }
        }
        else{
          todo={"id":id, "title": title, "dateBegin": dateBegin, "tags":tags }
        }
      }
      else{
        if(dateEnd!=undefined && dateEnd!=""){
          todo={"id":id, "title": title, "dateEnd": dateEnd, "tags":tags }
        }
        else{
          todo={"id":id, "title": title, "tags":tags }
        }
      }
    }
    else{
      if(dateBegin!=undefined && dateBegin!=""){
        if(dateEnd!=undefined && dateEnd!=""){
          todo={"id":id,"dateBegin": dateBegin, "dateEnd": dateEnd, "tags":tags }
        }
        else{
          todo={"id":id,"dateBegin": dateBegin, "tags":tags }
        }
      }
      else{
        if(dateEnd!=undefined && dateEnd!=""){
          todo={"id":id,"dateEnd": dateEnd, "tags":tags }
        }
        else{
          todo={"id":id, "tags":tags }
        }
      }
    }
    invocation.open('PUT', 'http://localhost:8080/todo/'+id, true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

      try{
              todo = JSON.parse(invocation.responseText);

      }catch(err){
        console.log("invocation.responseText "+invocation.responseText);
      }

        }else{
          console.error("Invocation Errors Occured " + invocation.readyState + " and the status is " + invocation.status);
        }
      }else{
        console.log("currently the application is at" + invocation.readyState);
      }
    };
    invocation.send(JSON.stringify(todo));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}
