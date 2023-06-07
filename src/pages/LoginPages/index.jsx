import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8080/api/token/", {
                username,
                password,
            });

            console.log(response);
            const { status, data } = response;

            if (status === 200) {
                const token = data.access;

                // Armazena o token no local storage
                localStorage.setItem("token", token);
                console.log(token);

                // Defina o cabeçalho personalizado no Axios
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                // Redireciona para a página após o login bem-sucedido
                navigate("/");
            } else {
                setError("Credenciais inválidas");
            }
        } catch (error) {
            setError("Ocorreu um erro ao realizar o login");
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redireciona para a tela de registro
    };

    useEffect(() => {
        // Verificar se o token está presente no localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            // Executar lógica para verificar a validade do token, se necessário
            // Definir o estado de autenticação como true se o token for válido
            // Exemplo: setAuthenticated(true);
        }
    }, []);

    return (
        <section>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <h1 className="mt-1 mb-5 pb-1">ARCADE QUESTION</h1>
                                            <p className="mb-5">
                                                O Arcade Question ajuda você a gamificar suas aulas e
                                                compartilhar ideias
                                            </p>
                                        </div>

                                        <div className="login-form">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="username">
                                                    Nome de usuário:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    className="form-control"
                                                    placeholder="Nome de usuário"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">
                                                    Senha:
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Senha"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="login-button"
                                                    onClick={handleLogin}
                                                >
                                                    Entrar
                                                </button>
                                                <br />
                                                <p className="mb-0 me-2">Não tem uma conta?</p>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline"
                                                    onClick={handleRegister}
                                                >
                                                    Registrar
                                                </button>
                                            </div>
                                        </div>

                                        {error && <div>{error}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Somos mais que uma ferramenta</h4>
                                        <p className="small mb-0">
                                            "Imagine aprender de forma divertida e criativa! Com
                                            nossa ferramenta de gamificação, você usa sua imaginação
                                            para aprender matérias de maneira fácil e prazerosa.
                                            Descubra como a imaginação pode ser sua aliada no processo
                                            de aprendizagem e se surpreenda com seus resultados.
                                            Experimente agora mesmo!"
                                        </p>
                                    </div>
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
