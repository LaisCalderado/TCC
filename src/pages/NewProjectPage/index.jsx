
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { database, auth } from "../../pages/config/firebase";
import { ref, push, set, onValue } from "firebase/database";
import api from "../../config/api";

import SelectField from "../../components/SelectField";
import ConteudoAplicado from "../../path/ConteudoAplicado";
import Jogadores from "../../path/Jogadores";
import Gostam from "../../path/Gostam";
import AoRedor from "../../path/aoRedor";

import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [selectedEnvironment, setSelectedEnvironment] = useState("");

    const [graus, setGraus] = useState([]);


    useEffect(() => {

        api.get('/graus_aplicacao/')
            .then((res) => {
                let aux = []
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id })
                })
                setGraus([...aux])
            })


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
        setSelectedOption(event.target.value);
        setSelectedEnvironment(""); // Limpa a seleção do ambiente ao mudar a opção
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

    const handleEnvironmentChange = (event) => {
        setSelectedEnvironment(event.target.value);
    };

    const renderEnvironmentOptions = () => {
        switch (selectedOption) {
            case "conteudoAplicado":
                return <ConteudoAplicado />;
            case "jogadores":
                return <Jogadores />;
            case "gostam":
                return <Gostam />;
            case "aoRedor":
                return <AoRedor />;
            default:
                return null;
        }
    };


    const OptionContent = () => {
        switch (selectedOption) {
            case "conteúdo-aplicado":
                return <ConteudoAplicado graus={graus} />;
            case "Os-seus-jogadores":
                return <Jogadores />;
            case "mais-gostam":
                return <Gostam />;
            case "seu-redor":
                return <AoRedor />;
            default:
                return null;
        }
    };



    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-center mb-4">Novo Projeto</h1>
                        <form onSubmit={handleCreateProject} className="form">
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
                                <label className="form-label">DEFININDO AMBIENTE</label>
                                <select
                                    className="form-control"
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="conteúdo-aplicado">Conteúdo aplicado</option>
                                    <option value="Os-seus-jogadores">Os seus jogadores</option>
                                    <option value="mais-gostam">O que mais gostam</option>
                                    <option value="seu-redor">O que tem o seu redor</option>
                                </select>
                            </div>
                            {renderEnvironmentOptions()}

                            <div className="form-group mb-3">
                                <label className="form-label">GAME DESIGN</label>
                                <select
                                    className="form-control"
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="tema">Tema</option>
                                    <option value="ambiente">Ambiente</option>
                                    <option value="player">Player</option>
                                    <option value="desafios">Desafios</option>
                                </select>
                            </div>
                            <label className="form-label">FINALIZAÇÃO</label>
                            <div>{/* Adicione o conteúdo da finalização aqui */}</div>
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Criar Novo Projeto
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <OptionContent />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProjectPage;
