import React, {useState, useContext} from "react";

import { AuthContext } from "../../contexts/auth";

import "./styles.css";

const LoginPage = () => {
    const {authenticated, login} = useContext(AuthContext);

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {email, password});

        login(email, password); //Integração com o contexto
    };

    return (
        <section>
            <div id="login" classe="login" >
                <div  className="login-logo">             
                    <div>                    
                        <h1>ARCADE QUESTION</h1> 
                    </div>
                    <div>
                        <p>O Arcade Question ajuda você a gamificar <br/>suas aulas e compartilhar ideias</p>
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
                        <div>
                        <button type="button" className="facebook-button">Login with Facebook</button>
                        <button type="button" className="google-button">Login with Google</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;