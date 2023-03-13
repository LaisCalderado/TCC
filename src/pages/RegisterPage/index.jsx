import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../config/firebase";



const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        <div>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Entrar</button>
                <button onClick={handleHome} className="register-button">Home</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default RegisterPage;