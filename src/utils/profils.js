const profils = [
  {
    id: 'DEPOSANT',
    libelle: 'déposant',
    avatar: 'D'
  },
  {
    id: 'INSTRUCTEUR',
    libelle: 'instructeur',
    avatar: 'I'
  },
  {
    id: 'MAIRIE',
    libelle: 'mairie',
    avatar: 'M'
  },
  {
    id: 'BETA',
    libelle: 'bêta',
    avatar: 'B'
  }
];

function userProfiles(user) {
  const result = [];
  user.profils.forEach(p =>
    result.push(profils.find(profil => profil.id === p))
  );
  return result;
}

export { userProfiles };

export default profils;
