class Todo{
/**
* Permet de créer une tâche
* @constructor
*/
  constructor(idcompteur,title,startDate,endDate,tags) {
  this.id=idcompteur;
  this.title=title;
  this.startDate=startDate;
  this.endDate=endDate;
  this.tags=tags;
}

getId() {
  return this.id;
}
getTitle() {
  return this.title;
}

getStartDate() {
  return this.startDate;
}

getEndDate() {
  return this.endDate;
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

setStartDate(startDate) {
  this.startDate=startDate;
}

setEndDate(endDate) {
  this.endDate=endDate;
}
setTags(tags) {
  this.tags=tags;
}


}

module.exports=Todo;
