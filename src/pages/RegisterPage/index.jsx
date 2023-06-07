import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8080/api/users/create/",
                {
                    username,
                    password,
                    email,
                }
            );

            if (response.status === 201) {
                // Cadastro bem-sucedido, redirecionar ou executar alguma ação
                navigate("/"); // Redireciona para a página home após o registro bem-sucedido
            } else {
                setError("Erro ao criar conta");
            }
        } catch (error) {
            console.error(error.response.data);
            setError("Erro ao criar conta");
        }
    };

    const handleHome = () => {
        navigate('/'); // Redireciona para a página home
    };

    return (
        <div id="register">
            <form className="register-form" onSubmit={handleSignup}>
                <h1>ARCADE QUESTION</h1>
                <div className="field">
                    <input
                        className="register-input"
                        type="text"
                        placeholder="Nome"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        className="register-input"
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className="register-button" type="submit">
                    Cadastrar
                </button>
                <button onClick={handleHome} className="register-button">
                    Voltar
                </button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default RegisterPage;
