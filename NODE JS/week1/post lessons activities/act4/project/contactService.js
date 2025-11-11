// declariw variable table bach n7atou fiha les contacts
const contacts = [];
// fonction bach tzid contact avec deux parametres smiya et telephone
function ajouterContact(name, phone) {
  contacts.push({ name, phone });
}
// fonction kadir return lvariable contact 
function listerContacts() {
  return contacts;
}
// kandirou export li deux fonctions bach nkhadmou bihom fi app.js
module.exports = { ajouterContact, listerContacts };