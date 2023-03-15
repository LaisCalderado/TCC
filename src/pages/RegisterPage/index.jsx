import { event } from "jquery";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "../config/firebase";
import { auth } from "../config/firebase";

import "./styles.css";


const RegisterPage = () => {

    const [user, setUser] = useState({});
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential.user);
            navigate('/'); // Redireciona para a página home
        } catch (error) {
            setError(error.message);
        }
    };

    const handleHome = () => {
        navigate('/'); // Redireciona para a página home
    };

    return (
        <div id="register">
            <form className="register-form" onSubmit={handleSignup}>
                <h1>ARCADE QUESTION</h1>
                <div className="field" >
                    <input className="register-input"
                            type="text" 
                            placeholder="Nome" 
                            id="nome" 
                            value={nome} onChange={(event) => setNome(event.target.value)} 
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
                <button className="register-button" type="submit">Cadastrar</button>
                <button onClick={handleHome} className="register-button">Voltar</button>
            </form>
        </div>
    );
};

export default RegisterPage;
