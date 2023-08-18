
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ButtonSubmit from "../../components/ButtonSubmit";
import { database, auth } from "../../pages/config/firebase";
import axios from "axios";
import api from "../../config/api";
import Swal from 'sweetalert2'

import ConteudoAplicado from "../../path/ConteudoAplicado";
import Jogadores from "../../path/Jogadores";
import Gostam from "../../path/Gostam";
import AoRedor from "../../path/aoRedor";
import Ambiente from "../../path/Ambiente";
import Temas from "../../path/Temas";

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsChevronUp, BsChevronDown, BsCheckCircle, BsPerson, BsHeart, BsMap, BsPalette, BsTrophy } from "react-icons/bs";
import { FaHome, FaRegUser } from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import "./style.css";

const NewProjectPage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [userProjects, setUserProjects] = useState([]);
    const [userId, setUserId] = useState("");
    const [selectedEnvironment, setSelectedEnvironment] = useState("");
    const [showQuadrados, setShowQuadrados] = useState(true);
    const [showEnvironmentOptions, setShowEnvironmentOptions] = useState(true);
    const [showDefinindoAmbiente, setShowDefinindoAmbiente] = useState(true);
    const [showGameDesign, setShowGameDesign] = useState(true);
    const [showFinalizacao, setShowFinalizacao] = useState(true);
    const [nomeProjeto, setnomeProjeto] = useState("");
    const [descricaoProjeto, setdescricaoProjeto] = useState("");
    const [selectedGrau, setSelectedGrau] = useState("");
    const [graus, setGraus] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState("");
    const [series, setSeries] = useState([]);
    const [selectedDisciplina, setSelectedDisciplina] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [selectedEstiloAprendizagem, setSelectedEstiloAprendizagem] = useState("");
    const [estiloaprendizagem, setEstiloaprendizagem] = useState([]);
    const [selectedInteresses, setSelectedInteresses] = useState("");
    const [interesses, setInteresses] = useState([]);
    const [selectedHabilidades, setSelectedHabilidades] = useState("");
    const [habilidades, setHabilidades] = useState([]);
    const [selectedRecompensasVirtuais, setSelectedRecompensasVirtuais] = useState("");
    const [recompensasVirtuais, setRecompensasVirtuais] = useState([]);
    const [selectedCompeticaoDesafios, setSelectedCompeticaoDesafios] = useState("");
    const [competicaoDesafios, setcompeticaoDesafios] = useState([]);
    const [selectedRecursos, setSelectedRecursos] = useState("");
    const [recursos, setRecursos] = useState([]);
    const [selectedConfiguracaoEspaco, setSelectedConfiguracaoEspaco] = useState("");
    const [configuracaoespaco, setConfiguracaoespaco] = useState("");
    const [selectedRelacaoProfessorAluno, setSelectedRelacaoProfessorAluno] = useState("");
    const [relacaoprofessoraluno, setRelacaoprofessoraluno] = useState([]);
    const [selectedDisponibilidadeTecnologia, setSelectedDisponibilidadeTecnologia] = useState("");
    const [disponibilidadetec, setDisponibilidadeTed] = useState([]);
    const [selectedNormasRegras, setSelectedNormasRegras] = useState("");
    const [normasregras, setNormasregras] = useState([]);
    const [selectedTemas, setSelectedTemas] = useState("");
    const [temas, setTemas] = useState([]);
    const [selectedAmbiente, setSelectedAmbiente] = useState("");
    const [ambientes, setAmbientes] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [selectedDesafio, setSelectedDesafio] = useState("");
    const [desafios, setDesafios] = useState([]);
    const [dados, setDados] = useState(null);

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

        // Solicitar os estilo aprendizagem
        api.get('/estilo_aprendizagem/')
            .then((res) => {
                console.log(res.data)
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.nome, value: item.id });
                });
                setEstiloaprendizagem([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar jogadores:", error);
            });

        api.get('/interesses/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.nome, value: item.id });
                });
                setInteresses([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar jogadores:", error);
            });

        api.get('/habilidades/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.nome, value: item.id });
                });
                setHabilidades([...aux]);
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

        api.get('/recompensas_virtuais/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setRecompensasVirtuais([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar gostos:", error);
            });

        api.get('/competicoes_desafios/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setcompeticaoDesafios([...aux]);
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

        api.get('/recursos/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setRecursos([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar ao redor:", error);
            });

        api.get('/configuracao_espaco/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setConfiguracaoespaco([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar ao redor:", error);
            });
        api.get('/professor_aluno/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setRelacaoprofessoraluno([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar ao redor:", error);
            });
        api.get('/disponibilidade_tec/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setDisponibilidadeTed([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar ao redor:", error);
            });
        api.get('/normas_regras/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setNormasregras([...aux]);
            })
            .catch((error) => {
                console.error("Erro ao buscar ao redor:", error);
            });
            api.get('/temas/')
            .then((res) => {
                let aux = [];
                res.data.map((item) => {
                    aux.push({ label: item.descricao, value: item.id });
                });
                setTemas([...aux]);
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

    useEffect(() => {
        // Função para buscar os dados da API do Django
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/projetos/');
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao obter os dados:', error);
            }
        };

        fetchData();
    }, []);
    if (!dados) {
        return <div>Carregando...</div>;
    }

    const handleConteudoAplicadoOption = () => {
        setSelectedOption("conteúdo-aplicado");
        setShowQuadrados(true);
        setSelectedEnvironment("");
    };

    const handleGameDesignOption = () => {
        setSelectedOption("game-design");
        setShowQuadrados(false);
        setSelectedEnvironment("");
        toggleGameDesign();
    };

    // Funções para alternar a exibição das seções
    const toggleDefinindoAmbiente = () => setShowDefinindoAmbiente(!showDefinindoAmbiente);
    const toggleGameDesign = () => setShowGameDesign(!showGameDesign);
    const toggleFinalizacao = () => setShowFinalizacao(!showFinalizacao);

    const handleEnvironmentOptionChange = (optionValue) => {
        setSelectedOption(optionValue);
        if (optionValue === "conteúdo-aplicado") {
            setShowQuadrados(true);
        } else {
            setShowQuadrados(false);
        }
        setSelectedEnvironment("");
    };

    const handleEnvironmentOptionGameDesignChange = (optionValue) => {
        setSelectedOption(optionValue);
        if (optionValue === "game-design") {
            setShowQuadrados(true);
        } else {
            setShowQuadrados(false);
        }
        setSelectedEnvironment("");
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

    const GameDesignOptions = () => {
        const options = [
            { value: "tema", label: "Tema", icon: <BsPalette size={40} /> },
            { value: "ambiente", label: "Ambiente", icon: <FaHome size={40} /> },
            { value: "player", label: "Player", icon: <FaRegUser size={40} /> },
            { value: "desafios", label: "Desafios", icon: <BsTrophy size={40} /> },
        ];

        return (
            <div className="form-group mb-3">
                <div className={`row ${showEnvironmentOptions ? "show-options" : "hide-options"}`}>
                    {options.map((option) => (
                        <div key={option.value} className="col-md-3">
                            <div
                                className={`quadrado-image option ${selectedOption === option.value ? "selected" : ""}`}
                                onClick={() => handleEnvironmentOptionGameDesignChange(option.value)}
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
                return <ConteudoAplicado graus={graus} series={series} disciplinas={disciplinas} selectedGrau={selectedGrau} setSelectedGrau={setSelectedGrau}
                    selectedSerie={selectedSerie} setSelectedSerie={setSelectedSerie} selectedDisciplina={selectedDisciplina} setSelectedDisciplina={setSelectedDisciplina} />;

            case "Os-seus-jogadores":
                return <Jogadores estiloaprendizagem={estiloaprendizagem} selectedEstiloAprendizagem={selectedEstiloAprendizagem} setSelectedEstiloAprendizagem={setSelectedEstiloAprendizagem}
                    interesses={interesses} selectedInteresses={selectedInteresses} setSelectedInteresses={setSelectedInteresses} habilidades={habilidades}
                    selectedHabilidades={selectedHabilidades} setSelectedHabilidades={setSelectedHabilidades} />;

            case "mais-gostam":
                return <Gostam recompensasVirtuais={recompensasVirtuais} selectedRecompensasVirtuais={selectedRecompensasVirtuais} setSelectedRecompensasVirtuais={setSelectedRecompensasVirtuais}
                    setRecompensasVirtuais={setRecompensasVirtuais} competicaoDesafios={competicaoDesafios} selectedCompeticaoDesafios={selectedCompeticaoDesafios}
                    setSelectedCompeticaoDesafios={setSelectedCompeticaoDesafios} setcompeticaoDesafios={setcompeticaoDesafios}
                />;
            case "seu-redor":
                return <AoRedor recursos={recursos} setRecursos={setRecursos} selectedRecursos={selectedRecursos} setSelectedRecursos={setSelectedRecursos} configuracaoespaco={configuracaoespaco}
                    setConfiguracaoespaco={setConfiguracaoespaco} selectedConfiguracaoEspaco={selectedConfiguracaoEspaco} setSelectedConfiguracaoEspaco={setSelectedConfiguracaoEspaco}
                    relacaoprofessoraluno={relacaoprofessoraluno} selectedRelacaoProfessorAluno={selectedRelacaoProfessorAluno} setSelectedRelacaoProfessorAluno={setSelectedRelacaoProfessorAluno}
                    disponibilidadetec={disponibilidadetec} selectedDisponibilidadeTecnologia={selectedDisponibilidadeTecnologia} setSelectedDisponibilidadeTecnologia={setSelectedDisponibilidadeTecnologia}
                    normasregras={normasregras} selectedNormasRegras={selectedNormasRegras} setSelectedNormasRegras={setSelectedNormasRegras} />;

            case "tema":
                return <Temas temas={temas} setTemas={setTemas} selectedTemas={selectedTemas} setSelectedTemas={setSelectedTemas}/>

            default:
                return null;
        }
    };

    function criarProjetos() {
        console.log(selectedGrau)
        if (nomeProjeto && descricaoProjeto) {
            let data = {
                "titulo": nomeProjeto,
                "descricao": descricaoProjeto,
                "url_imagem": null,
                "grauAplicacao": Number(selectedGrau) || null,
                "series": Number(selectedSerie) || null,
                "disciplinas": Number(selectedDisciplina) || null,
                "estilo_aprendizagem": Number(selectedEstiloAprendizagem) || null,
                "interesses": Number(selectedInteresses) || null,
                "habilidades": Number(selectedHabilidades) || null,
                "recompensasVirtuais": Number(selectedRecompensasVirtuais) || null,
                "competicaoDesafios": Number(selectedCompeticaoDesafios) || null,
                "recursos": Number(selectedRecursos) || null,
                "configuracaoespaco": Number(selectedConfiguracaoEspaco) || null,
                "professorAluno": Number(selectedRelacaoProfessorAluno) || null,
                "disponibilidadeTec": Number(selectedDisponibilidadeTecnologia) || null,
                "normasRegras": Number(selectedNormasRegras) || null,
                "publico": null,
                "usuario": Number(localStorage.getItem("user_id"))
            }
            console.log(data)
            api.post("/projetos/", data).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Projeto cadastrado',
                })
                setnomeProjeto("") //limpar inputs
                setdescricaoProjeto("")
            }).catch((error) => {
                console.log(error)
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Atênção',
                text: 'Preencha todos os campos',
            })
        }
    }



    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-center mb-4">Novo Projeto</h1>
                        <div className="form">
                            <div className="form-group mb-4">
                                <label htmlFor="projectName" className="form-label">
                                    Nome do Projeto
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="projectName"
                                    placeholder="Digite o nome do projeto"
                                    value={nomeProjeto}
                                    onChange={(e) => setnomeProjeto(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="projectName" className="form-label">
                                    Descrição do Projeto
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="projectName"
                                    placeholder="Digite o descrição do projeto"
                                    value={descricaoProjeto}
                                    onChange={(e) => setdescricaoProjeto(e.target.value)}
                                />
                            </div>

                            {/* Definindo Ambiente */}
                            <div className="form-group mb-3">
                                <label
                                    className="form-label toggle-label"
                                    onClick={toggleDefinindoAmbiente}
                                >
                                    DEFININDO AMBIENTE
                                    {showDefinindoAmbiente ? (
                                        <BsChevronUp className="toggle-icon" />
                                    ) : (
                                        <BsChevronDown className="toggle-icon minimized" />
                                    )}
                                </label>
                                <Collapse in={showDefinindoAmbiente}>
                                    <div>
                                        {renderEnvironmentOptions()}
                                    </div>
                                </Collapse>
                            </div>

                            {/* Game Design */}
                            <div className="form-group mb-3">
                                <label
                                    className="form-label toggle-label"
                                    onClick={toggleGameDesign}
                                >
                                    GAME DESIGN
                                    {showGameDesign ? (
                                        <BsChevronUp className="toggle-icon" />
                                    ) : (
                                        <BsChevronDown className="toggle-icon minimized" />
                                    )}
                                </label>
                                <Collapse in={showGameDesign}>
                                    <div>
                                        {GameDesignOptions()}
                                    </div>
                                </Collapse>
                            </div>

                            {/* Finalização */}
                            <label
                                className="form-label toggle-label"
                                onClick={toggleFinalizacao}
                            >
                                FINALIZAÇÃO
                                {showFinalizacao ? (
                                    <BsChevronUp className="toggle-icon" />
                                ) : (
                                    <BsChevronDown className="toggle-icon minimized" />
                                )}
                            </label>
                            <Collapse in={showFinalizacao}>
                                <div>
                                    {/* Adicione o conteúdo da finalização aqui */}
                                </div>
                            </Collapse>

                            <div className="form-group mt-3">
                                <ButtonSubmit onClick={criarProjetos}>Criar Novo Projeto</ButtonSubmit>
                            </div>
                        </div>
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