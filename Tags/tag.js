class Tag{
/**
* Permet de créer une tâche
* @constructor
*/
  constructor(idcompteur,name) {
  this.id=idcompteur;
  this.name=name;
}

getId() {
  return this.id;
}
getName() {
  return this.name;
}

setId(id) {
  this.id=id;
}

setName(name) {
  this.name=name;
}



}

module.exports=Tag;
