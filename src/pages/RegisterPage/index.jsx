import React, { useState } from "react";
import { auth, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged } from "../config/firebase";
import "./styles.css";


const RegisterPage = () => {

    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        } catch (error) {
            setError(error.message);
        }
    };

    const handleHome = () => {
        window.location.href = "/"; // Redireciona para a página de registro
    };

    return (
        <div id="register">
            <form className="register-form" onSubmit={handleSignup}>
                <h1>ARCADE QUESTION</h1>
                <div className="field">
                    <label type="email">Email</label>
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
                    <label type="password">Password</label>
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className="register-button" type="submit">Cadatrar</button>
                <button onClick={handleHome} className="register-button">Home</button>
            </form>
            <h4>Usuário Logado:</h4>
            {user?.email}
            {error && <div>{error}</div>}
        </div>
    );
};

export default RegisterPage;
