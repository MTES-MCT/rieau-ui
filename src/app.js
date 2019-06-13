import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useUser } from 'context/user-context';

const loadUnAuthenticatedApp = () => import('./unauthenticated-app');
const UnAuthenticatedApp = React.lazy(loadUnAuthenticatedApp);
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));

function App() {
  const { isAuthenticated } = useUser();
  React.useEffect(() => {
    loadUnAuthenticatedApp();
  }, [isAuthenticated]);
  return (
    <React.Suspense fallback={<LinearProgress />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
