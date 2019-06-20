import api from 'utils/api';

function handleDossiers() {
  return api.then(api => {
    return api.default.dossiers;
  });
}

function loadUserDossiers() {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.loadUserDossiers();
  });
}

const dossiers = {
  loadUserDossiers
};

export default dossiers;
