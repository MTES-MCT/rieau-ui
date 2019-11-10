import { userProfiles } from 'users/profils';

function initiale(texte) {
  return texte.toUpperCase().substring(0, 1);
}

function initiales(person) {
  return initiale(person.prenom) + initiale(person.nom);
}

function nomCompletAvecProfils(personne) {
  return `${nomComplet(personne)} (${userProfiles(personne)
    .map(profil => profil.libelle)
    .toString()})`;
}

function nomComplet(personne) {
  return `${personne.prenom}  ${personne.nom}`;
}

export { initiales, nomCompletAvecProfils, nomComplet };
