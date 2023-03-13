import React, { useState, useContext } from "react";
import {createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        onAuthStateChanged,
        signOut,
} from "firebase/auth"
import { auth } from "../config/firebase"

import { AuthContext } from "../../contexts/auth";

import "./styles.css";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user,setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", { email, password });

        login(email, password); //Integração com o contexto
    };

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }

    };

    const Login = async () => {
        try{
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const Logout = async () => {
        await signOut(auth);
    };

    return (
        <section>
            <div id="login" className="login" >
                <div className="login-logo">
                    <div>
                        <h1>ARCADE QUESTION</h1>
                        {user?.email}
                    </div>
                    <div>
                        <p>O Arcade Question ajuda você a gamificar <br />suas aulas e compartilhar ideias</p>
                    </div>
                </div >
                <div className="login-inputs">
                    <h1 className="title">ARCADE QUESTION</h1>
                    <p>{String(authenticated)}</p>
                    <form className="login-form" onSubmit={handleSubmit}>
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
                    </form>
                    <div>
                        <h2>Novos Usuários</h2>
                        <input type="email" placeholder="Email"
                        onChange={(e) =>{ setRegisterEmail(e.target.value);
                        }} 
                        />
                        <input type="password" placeholder="Password"
                        onChange={(e) =>{ setRegisterPassword(e.target.value);
                        }} 
                        />
                        <button onClick={register}>Registar</button>
                        <button onClick={Logout}>Logout</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;