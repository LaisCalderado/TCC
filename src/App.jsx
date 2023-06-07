import React, { useState } from 'react';
import { AuthProvider } from './contexts/auth';
import AppRoutes from './AppRoutes';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthProvider value={{ authenticated, setAuthenticated }}>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
