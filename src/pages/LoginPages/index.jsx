import React, { useState } from "react";
import api from "../../config/api";
import { login } from "../../config/auth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import "./styles.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
            const data = {
                username: username,
                password: password,
            };

            api.post('api/token/', data)
                .then((res) => {
                    console.log(res.data);
                    login(res.data.access, res.data.user);
                    // Navegar para a próxima página após o login bem-sucedido
                    navigate("/home");
                })
                .catch((err) => {
                    Swal.fire(
                        'Atenção',
                        'Credenciais inválidas',
                        'warning'
                    );
                });
        } else {
            Swal.fire(
                'Atenção',
                'Preencha todos os campos',
                'warning'
            );
        }
    };

    const handleRegister = () => {
        navigate("/register"); // Redirecionar para a página de registro
    };

    return (
        <section className="min-vh-100 d-flex align-items-center lilac-background">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light text-dark rounded-3">
                            <div className="card-body p-md-5 mx-md-4">
                                <div className="text-center">
                                    <h1 className="mt-1 mb-5 pb-1">GDS System</h1>
                                    <p className="mb-5">
                                        O GDS System ajuda você a gamificar suas aulas e compartilhar ideias
                                    </p>
                                </div>

                                <div className="login-form">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="form-control login-input"
                                            placeholder="Nome de usuário"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            className="form-control login-input"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="text-center mb-5">
                                        <button
                                            className="btn btn-primary login-button"
                                            onClick={handleLogin}
                                        >
                                            Entrar
                                        </button>
                                        <br />
                                        <p className="mb-0 me-2">Não tem uma conta?</p>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={handleRegister}
                                        >
                                            Registrar
                                        </button>
                                    </div>

                                    {error && <div className="text-danger">{error}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
