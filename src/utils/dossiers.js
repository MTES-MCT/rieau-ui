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

function deposer(cerfa) {
  return api.then(handleDossiers).then(dossiers => {
    return dossiers.deposer(cerfa);
  });
}

const dossiers = {
  loadUserDossiers,
  deposer
};

export default dossiers;
