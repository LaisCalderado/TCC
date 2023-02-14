import React, { useState, useEffect, createContext }from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); //serve para esperar a confirmção do usuário
    //const [error, setError] = useState("");

    useEffect(() => {
        //Toda vez que der refresh na pagina ele pegará o usuario q tava logado
        const recoveredUsers = localStorage.getItem('user');

        if(recoveredUsers){
            setUser(JSON.parse(recoveredUsers));
        }

        setLoading(false);

    }, []);

    const login = (email, password) => {

        console.log('login auth', {email, password});
       
        //Criar uma sessão
        const loggdUsser= {
            id: '123',
            email,
        };

        //grava somente tipos nativos (STRING, INT... utiloizar stringify)
        localStorage.setItem('user', JSON.stringify(loggdUsser));

        if(password === "secret"){
            setUser({id: "123", email}); //sem servidor real
            navigate("/");
        }
        else {
            alert("Incorrect email or password. Please try again.");
        }

    };
    // if user != null
    // authenticated == true

    const logout = () => {
        console.log('logout');
        localStorage.removeItem('user');
        setUser(null);
        navigate("/login");
    };

    const profile = () => {
        navigate("/profile");

    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout, profile}}>{children}</AuthContext.Provider>
    );
};