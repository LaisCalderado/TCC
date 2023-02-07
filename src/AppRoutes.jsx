import React, {useContext} from 'react';

import { 
    BrowserRouter as Router, 
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
        
import LoginPage from './pages/LoginPages';
import HomePage from './pages/HomePage';

import { AuthProvider, AuthContext } from "./contexts/auth";

const AppRoutes = () =>{ 

    const Private = ({children}) =>{
        const{ authenticated, loading } = useContext(AuthContext);

        if(loading){
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated){
            //Se não for autenticado volta para a pagina de login
            return <Navigate to='/login'/>;
        }return children;

    };
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path ="login" element={<LoginPage/>}/>
                    <Route exact path ="/" element={<Private><HomePage/></Private>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;