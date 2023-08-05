// Router.js

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importe seus componentes para as rotas aqui
import HomePage from './pages/HomePage';
import NewProjectPage from './pages/NewProjectPage';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-project" element={<NewProjectPage />} />

       
        <Route path="*" element={<div>404: pagina nao encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
