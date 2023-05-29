import { AuthProvider} from "../src/contexts/auth";
import { UserProvider} from "../src/contexts/UserContext"
import './App.css';

import AppRoutes from './AppRoutes';

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
