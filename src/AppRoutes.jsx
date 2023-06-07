import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, AuthContext } from './contexts/auth';
import LoginPages from './pages/LoginPages';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import MathPage from './pages/MathPage';
import EnglishPage from './pages/EnglishPage';
import RegisterPage from './pages/RegisterPage';
import NewProjectPage from './pages/NewProjectPage';

const AppRoutes = () => {
    const { authenticated, setAuthenticated, loading } = useContext(AuthContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/me/');
                const { authenticated } = response.data;
                setAuthenticated(authenticated);
            } catch (error) {
                // Lidar com erros de verificação de autenticação
            }
        };

        checkAuth();
    }, [setAuthenticated]);

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPages />} />
                    {authenticated ? (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/math" element={<MathPage />} />
                            <Route path="/english" element={<EnglishPage />} />
                            <Route path="/new-project" element={<NewProjectPage />} />
                        </>
                    ) : (
                        <Route path="/login" element={<LoginPages />} />
                    )}
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
