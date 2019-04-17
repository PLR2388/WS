var idcompteur=0;
class todo{
/**
* Permet de créer une tâche
* @constructor
*/


  constructor(title,startDate,endDate,statut,tags) {
  this.id=idcompteur++;
  this.title=title;
  this.startDate=startDate;
  this.endDate=endDate;
  this.statut=statut;
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
getStatut() {
  return this.statut;
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

setStatut(statut) {
  this.statut=statut;
}

setTags(tags) {
  this.tags=tags;
}


}

module.exports=todo;
