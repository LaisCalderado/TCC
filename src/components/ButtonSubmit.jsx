import React, { useState } from 'react';
import NewProjectPage from '../pages/NewProjectPage';
import './ButtonSubmit.css'; // Importe o arquivo CSS do botão aqui

const ButtonSubmit = ({ onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    onClick();
  };

  return (
    <button className={`button ${loading ? 'onclic' : ''}`} onClick={handleClick}>
      {loading ? 'Criando PrCriar Novo Projeto' : 'Criar Novo Projeto'}
    </button>
  );
};

export default ButtonSubmit;
