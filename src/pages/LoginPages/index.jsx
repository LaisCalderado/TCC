import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../config/firebase";

import "./styles.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            navigate('/');
        } catch (error) {
            setError("Erro ao entrar com senha e e-mail!, Verifique seu Email e/ou Senha...");
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

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
                                            <p className="mb-5">O Arcade Question ajuda você a gamificar suas aulas e compartilhar ideias</p>
                                        </div>

                                        <form className="login-form" onSubmit={handleLogin}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input type="email" id="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Senha</label>
                                                <input type="password" id="password" className="form-control" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary form-control fa-lg gradient-custom-2 mb-3" type="submit">Entrar</button>
                                                <br />
                                                <p className="mb-0 me-2">Não tem uma conta?</p>
                                                <button type="button" className="btn btn-outline-danger " onClick={handleRegister}>Registrar</button>
                                            </div>
                                        </form>

                                        {error && <div>{error}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Somos mais que uma ferramente</h4>
                                        <p className="small mb-0">"Imagine aprender de forma divertida e criativa! Com nossa ferramenta de gameficação,
                                            você usa sua imaginação para aprender matérias decorativas de maneira fácil e prazerosa.
                                            Descubra como a imaginação pode ser sua aliada no processo de aprendizagem e se surpreenda com seus resultados.
                                            Experimente agora mesmo!"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default LoginPage;