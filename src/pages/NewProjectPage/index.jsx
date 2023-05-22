import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { database, auth } from "../../pages/config/firebase";
import { ref, push, set, onValue } from "firebase/database";

import ConteudoAplicado from "../../path/ConteudoAplicado";
import Jogadores from "../../path/Jogadores";
import Gostam from "../../path/Gostam";
import Redor from "../../path/aoRedor";

import "./style.css";

const NewProjectPage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [checkboxState, setCheckboxState] = useState({
        conteudoAplicado: false,
        jogadores: false,
        gostam: false,
        redor: false,
    });
    const [userProjects, setUserProjects] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const snapshot = await database
                    .ref(`users/${userId}/projects`)
                    .once("value");
                const projects = snapshot.val() || [];
                setUserProjects(projects);
            } catch (error) {
                console.error("Erro ao buscar projetos do usuário:", error);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId("");
            }
        });

        if (userId) {
            fetchUserProjects();
        }

        return () => unsubscribe();
    }, [userId]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.name);
    };

    const handleCreateProject = (event) => {
        event.preventDefault();

        const newProject = {
            name: event.target.projectName.value,
            environment: {
                conteudoAplicado: checkboxState.conteudoAplicado,
                jogadores: checkboxState.jogadores,
                gostam: checkboxState.gostam,
                redor: checkboxState.redor,
            },
            grade: selectedOption,
        };

        try {
            const userProjectsRef = ref(database, `users/${userId}/projects`);
            const projectRef = push(userProjectsRef);
            set(projectRef, newProject)
                .then(() => {
                    console.log("Novo projeto criado com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao criar novo projeto:", error);
                });
        } catch (error) {
            console.error("Erro ao criar novo projeto:", error);
        }
    };

    const OptionContent = () => {
        switch (selectedOption) {
            case "conteudoAplicado":
                return <ConteudoAplicado />;
            case "jogadores":
                return <Jogadores />;
            case "gostam":
                return <Gostam />;
            case "redor":
                return <Redor />;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h1 className="text-center mb-5">Novo Projeto</h1>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={handleCreateProject}>
                                <div className="form-group mb-3">
                                    <label htmlFor="projectName" className="form-label">
                                        Nome do Projeto
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="projectName"
                                        placeholder="Digite o nome do projeto"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Definindo Ambiente</label>
                                    <div>
                                        <button
                                            className={`btn btn-link ${selectedOption === "conteudoAplicado" ? "active" : ""}`}
                                            name="conteudoAplicado"
                                            onClick={handleOptionChange}
                                        >
                                            Conteúdo aplicado
                                        </button>
                                        <button
                                            className={`btn btn-link ${selectedOption === "jogadores" ? "active" : ""}`}
                                            name="jogadores"
                                            onClick={handleOptionChange}
                                        >
                                            Os seus jogadores
                                        </button>
                                        <button
                                            className={`btn btn-link ${selectedOption === "gostam" ? "active" : ""}`}
                                            name="gostam"
                                            onClick={handleOptionChange}
                                        >
                                            O que mais gostam
                                        </button>
                                        <button
                                            className={`btn btn-link ${selectedOption === "redor" ? "active" : ""}`}
                                            name="redor"
                                            onClick={handleOptionChange}
                                        >
                                            O que tem o seu redor
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Qual grau?</label>
                                                <select
                                                    value={selectedOption}
                                                    onChange={handleOptionChange}
                                                    disabled={selectedOption !== ""}
                                                >
                                                    <option value="">Escolha uma opção</option>
                                                    <option value="Ensino fundamental">Ensino fundamental</option>
                                                    <option value="Ensino médio">Ensino médio</option>
                                                    <option value="Ensino superior">Ensino superior</option>
                                                    <option value="Técnico">Técnico</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label> Qual série?</label>
                                                <select value={selectedOption}
                                                    onChange={handleOptionChange}
                                                    disabled={selectedOption !== ""}>
                                                        <option value="1 Série">1 Série</option>
                                                        <option value="2 Série">2 Série</option>
                                                        <option value="3 Série">3 Série</option>
                                                    </select>
                                            </div>
                                            <div className="form-group">
                                                <label> Qual Disciplina</label>
                                                <select value={selectedOption}
                                                    onChange={handleOptionChange}
                                                    disabled={selectedOption !== ""}
                                                    >
                                                        <option value="Matemática">Matemática</option>
                                                        <option value="Física">Física</option>
                                                        <option value="Lingua Portuguesa">Língua Portuguesa</option>

                                                    </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-primary">
                                                Criar Novo Projeto
                                            </button>
                                        </div>
                                    </div>
                                    <OptionContent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProjectPage;
