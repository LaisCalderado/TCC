import React, { useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth"
import { auth } from "../config/firebase"
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth";

import "./styles.css";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            console.log(userCredential);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = () => {
        window.location.href = "/register"; // Redireciona para a página de registro
      };

return (
    <section>
        <div id="login" className="login" >
            <div className="login-logo">
                <div>
                    <h1>ARCADE QUESTION</h1>
                </div>
                <div>
                    <p>O Arcade Question ajuda você a gamificar <br />suas aulas e compartilhar ideias</p>
                </div>
            </div >
            <div className="login-inputs">
                <h1 className="title">ARCADE QUESTION</h1>
                <p>{String(authenticated)}</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <div className="actions">
                        <button type="submit" className="login-button">Entrar</button>
                    </div>
                    <div>
                        <button onClick={handleRegister} className="register-button">Cadastrar</button>
                    </div>
                </form>
                {error && <div>{error}</div>}

            </div>
        </div>
    </section>
);
}

export default LoginPage;