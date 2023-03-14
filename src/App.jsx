import { AuthProvider } from "../src/contexts/auth";
import './App.css';

import AppRoutes from './AppRoutes';

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
