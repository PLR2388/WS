var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var invocation=new XMLHttpRequest();

var tags={};

exports.getTAG = function() {
  return tags;
};

function handlerTags(evtXHR){
  if (invocation.readyState == 4){
    if (invocation.status == 200){

	try{
      	tags = JSON.parse(invocation.responseText);
		  //  console.log(response);
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


 exports.getAllTags=function(){
  if(invocation){
    invocation.open('GET', 'http://localhost:3030/', false);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);

    		  //  console.log(response);
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





exports.createATag=function(title){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={name: title };
    invocation.open('POST', 'http://localhost:3030', true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);
    		  //  console.log(response);
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
    invocation.send(JSON.stringify(tag));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}

exports.getATag=function(id){
  if(invocation){
    invocation.open('GET', 'http://localhost:3030/'+id
    , false);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);

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

 exports.deleteATag=function(id){
  var invocation =new XMLHttpRequest();
  if(invocation){
    invocation.open('DELETE', 'http://localhost:3030/'+id, true);
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags = JSON.parse(invocation.responseText);

    		  //  console.log(response);
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
exports.updateTag=function(id,title){
  var invocation =new XMLHttpRequest();
  if(invocation){
    let tag={"name": title };
    invocation.open('PUT', 'http://localhost:3030/'+id, true);
    invocation.setRequestHeader('Content-Type', 'application/json');
    invocation.onreadystatechange = function(){
      if (invocation.readyState == 4){
        if (invocation.status == 200){

    	try{
          	tags= JSON.parse(invocation.responseText);

    		  //  console.log(response);
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
    invocation.send(JSON.stringify(tag));
  }else{
    console.error("No Invocation TookPlace At All");
  }
}
