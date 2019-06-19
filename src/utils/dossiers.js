import api from 'utils/api';

function loadUserDossiers() {
  return api.then(api => {
    return api.default.dossiers.loadUserDossiers();
  });
}

const dossiers = {
  loadUserDossiers
};

export default dossiers;
