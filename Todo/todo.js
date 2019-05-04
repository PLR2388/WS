class Todo{
/**
* Permet de créer une tâche
* @constructor
*/
  constructor(idcompteur,title,startDate,endDate,tags) {
  this.id=idcompteur;
  this.title=title;
  this.dateBegin=startDate;
  this.dateEnd=endDate;
  this.tags=tags;
}

getId() {
  return this.id;
}
getTitle() {
  return this.title;
}

getdateBegin() {
  return this.dateBegin;
}

getdateEnd() {
  return this.dateEnd;
}

getTags() {
  return this.tags;
}

setId(id) {
  this.id=id;
}

setTitle(title) {
  this.title=title;
}

setdateBegin(startDate) {
  this.dateBegin=startDate;
}

setdateEnd(endDate) {
  this.dateEnd=endDate;
}
setTags(tags) {
  this.tags=tags;
}


}

module.exports=Todo;
