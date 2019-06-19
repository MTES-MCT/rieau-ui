import auth from 'utils/auth';
import dossiersApi from 'utils/dossiers';

async function bootstrapAppData() {
  const user = await auth.getUser();
  const isAuthenticated = await auth.isAuthenticated();
  if (!isAuthenticated) {
    return { user: null, isAuthenticated: false, dossiers: [] };
  }

  const dossiers = await dossiersApi.loadUs(user.id);
  return {
    user,
    isAuthenticated,
    dossiers
  };
}

export { bootstrapAppData };
