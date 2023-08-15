import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

import "./styles.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (username && password) {
            const data = {
                username: username,
                password: password,
            };

            try {
                const response = await api.post('users/create/', data);
                if (response.status === 201) {
                    Swal.fire('Sucesso', 'Usuário cadastrado', 'success');
                    navigate('/home');
                } else {
                    console.log(response.data); // Exibir resposta completa para depuração
                    Swal.fire('Erro', 'Erro ao cadastrar usuário', 'error');
                }
            } catch (error) {
                console.log(error); // Exibir erro completo para depuração
                Swal.fire('Erro', 'Erro ao cadastrar usuário', 'error');
            }
        } else {
            Swal.fire('Atenção', 'Preencha todos os campos', 'warning');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" >
                <h1 className="register-title">GDS System</h1>
                <div className="register-field">
                    <input
                        className="register-input"
                        type="text"
                        placeholder="Nome"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="register-field">
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Senha"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className="register-button" type="button" onClick={handleRegister}>
                    Cadastrar
                </button>
                <button onClick={() => navigate("/login")} className="register-button register-button-secondary">
                    Voltar para a Página Inicial
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
