// kandiro importation dyal les modules 
// kanrigistriw dakchi fi deux variables
const { ajouterContact, listerContacts } = require("./contactService");
const  formaterContact  = require("./utils/format");
// kanzidou jouj dyal les donnees 
ajouterContact("Younes", "0600000000");
ajouterContact("Sara", "0611111111");
// affichage bal boucle foreach 
console.log("Liste des contacts :");
listerContacts().forEach(c => {
  console.log(formaterContact(c));
});
