import api from './api';

async function bootstrapAppData() {
  const { dossiers } = await api.loadUserDossiers(0);
  return {
    dossiers
  };
}

export { bootstrapAppData };
