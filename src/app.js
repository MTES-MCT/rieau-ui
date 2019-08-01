import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useUser } from 'context/user-context';
import ErrorBoundary from 'components/ErrorBoundary';

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
      <ErrorBoundary>
        {isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
