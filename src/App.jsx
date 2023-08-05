import React, { useState } from 'react';
import { AuthProvider } from './contexts/auth';
import AppRoutes from './AppRoutes';

import Router from './rotas';
function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return <Router/>
  /*return (
    <AuthProvider value={{ authenticated, setAuthenticated }}>
      <AppRoutes />
    </AuthProvider>
  );*/


}

export default App;
