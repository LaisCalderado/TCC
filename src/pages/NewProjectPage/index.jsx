
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { database, auth } from "../../pages/config/firebase";
import { ref, push, set } from "firebase/database";
import api from "../../config/api";

import ConteudoAplicado from "../../path/ConteudoAplicado";
import Jogadores from "../../path/Jogadores";
import Gostam from "../../path/Gostam";
import AoRedor from "../../path/aoRedor";

import Select from "react-select";

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCheckCircle, BsPerson, BsHeart, BsMap } from "react-icons/bs";
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
    const [isEnvironmentOptionsOpen, setIsEnvironmentOptionsOpen] = useState(true);
    const [showQuadrados, setShowQuadrados] = useState(true);
    const [showEnvironmentOptions, setShowEnvironmentOptions] = useState(true);
    const [graus, setGraus] = useState([]);
    const [series, setSeries] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [conteudos, setConteudos] = useState([]);
    const [jogadores, setJogadores] = useState([]);
    const [gostam, setGostam] = useState([]);
    const [aoRedor, setAoRedor] = useState([]);

    useEffect(() => {
        // Solicitar os graus de aplicação
        api.get('/graus_aplicacao/')
            .then((res) => {
                let aux = []
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id })
                })
                setGraus([...aux])
            })
            .catch((error) => {
                console.error("Erro ao buscar graus de aplicação:", error);
            });
            console.log("Dados de graus:", graus);

        // Solicitar os séries de aplicação
        api.get('/series/')
            .then((res) => {
                let aux = []
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id })
                })
                setSeries([...aux])
            })
            .catch((error) => {
                console.error("Erro ao buscar as séries:", error);
            });
            console.log("Dados de séries:", series);

        // Solicitar os disciplinas de aplicação
        api.get('/disciplinas/')
            .then((res) => {
                let aux = []
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id })
                })
                setDisciplinas([...aux])
            })
            .catch((error) => {
                console.error("Erro ao buscar as disciplinas:", error);
            });
            console.log("Dados de disciplinas:", disciplinas);

        // Solicitar os conteúdos aplicados
        api.get('/conteudos/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setConteudos([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar conteúdos aplicados:", error);
            });

        // Solicitar os jogadores
        api.get('/jogadores/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.nome, value: item.id });
                });
                setJogadores([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar jogadores:", error);
            });

        // Solicitar os gostos
        api.get('/gostam/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setGostam([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar gostos:", error);
            });

        // Solicitar os ao redor
        api.get('/ao_redor/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setAoRedor([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar ao redor:", error);
            });

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
        if (event.target.value === "conteúdo-aplicado") {
            setShowQuadrados(true);
        } else {
            setShowQuadrados(false);
        }
        setSelectedEnvironment("");
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
    const handleEnvironmentOptionChange = (optionValue) => {
        setSelectedOption(optionValue);
        if (optionValue === "conteúdo-aplicado") {
            setShowQuadrados(true);
        } else {
            setShowQuadrados(false);
        }
        setSelectedEnvironment("");
    };

    const handleToggleEnvironmentOptions = () => {
        setIsEnvironmentOptionsOpen((prevIsOpen) => !prevIsOpen);
    };

    const renderEnvironmentOptions = () => {
        const options = [
            { value: "conteúdo-aplicado", label: "Conteúdo Aplicado", icon: <BsCheckCircle size={40} /> },
            { value: "Os-seus-jogadores", label: "Os seus jogadores", icon: <BsPerson size={40} /> },
            { value: "mais-gostam", label: "O que mais gostam", icon: <BsHeart size={40} /> },
            { value: "seu-redor", label: "O que tem ao seu redor", icon: <BsMap size={40} /> },
        ];

        return (
            <div className="form-group mb-3">
                <label className="form-label">DEFININDO AMBIENTE</label>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={() => setShowEnvironmentOptions(!showEnvironmentOptions)}
                >
                    {showEnvironmentOptions ? "DEFININDO AMBIENTE" : "DEFININDO AMBIENTE"}
                </button>
                <div className={`row ${showEnvironmentOptions ? "show-options" : "hide-options"}`}>
                    {options.map((option) => (
                        <div key={option.value} className="col-md-3">
                            <div
                                className={`quadrado-image option ${selectedOption === option.value ? "selected" : ""}`}
                                onClick={() => handleEnvironmentOptionChange(option.value)}
                            >
                                <div className="icon-container">{option.icon}</div>
                                {option.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    };

    const GameDesignOptions = ({ selectedOption, handleOptionChange }) => {
        const options = [
            { value: "tema", label: "Tema", icon: <BsCheckCircle size={40} /> },
            { value: "ambiente", label: "Ambiente", icon: <BsPerson size={40} /> },
            { value: "player", label: "Player", icon: <BsHeart size={40} /> },
            { value: "desafios", label: "Desafios", icon: <BsMap size={40} /> },
        ];

        return (
            <div className="form-group mb-3">
                <label className="form-label">GAME DESIGN</label>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={() => setShowEnvironmentOptions(!showEnvironmentOptions)}
                >
                    {showEnvironmentOptions ? "GAME DESIGN" : "GAME DESIGN"}
                </button>
                <div className={`row ${showEnvironmentOptions ? "show-options" : "hide-options"}`}>
                    {options.map((option) => (
                        <div key={option.value} className="col-md-3">
                            <div
                                className={`quadrado-image option ${selectedOption === option.value ? "selected" : ""}`}
                                onClick={() => GameDesignOptions(option.value)}
                            >
                                <div className="icon-container">{option.icon}</div>
                                {option.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    };


    const OptionContent = () => {
        switch (selectedOption) {
            case "conteúdo-aplicado":
                return <ConteudoAplicado graus={graus} series={series} disciplinas={disciplinas} />;
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
