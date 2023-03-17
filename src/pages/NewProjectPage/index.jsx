import { Link } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./style.css";


const NewProjectPage = () => {

    const [selectedOption, setSelectedOption] = useState("");
    const [checkboxState, setCheckboxState] = useState({
        conteudoAplicado: false,
        jogadores: false,
        gostam: false,
        redor: false
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setCheckboxState({
            ...checkboxState,
            [event.target.name]: event.target.checked
        });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
            
                    <h1 className="text-center mb-5">Novo Projeto</h1>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form >
                                <div className="form-group mb-3">
                                    <label htmlFor="projectName" className="form-label">Nome do Projeto</label>
                                    <input type="text" className="form-control" id="projectName" placeholder="Digite o nome do projeto" />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Definindo Ambiente</label>
                                    <div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="conteudoAplicado" checked={checkboxState.conteudoAplicado} onChange={handleCheckboxChange} id="conteudoAplicado" />
                                            <label className="form-check-label" htmlFor="conteudoAplicado">
                                                Conteúdo aplicado
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="jogadores" checked={checkboxState.jogadores} onChange={handleCheckboxChange} id="jogadores" />
                                            <label className="form-check-label" htmlFor="jogadores">
                                                Os seus jogadores
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="gostam" checked={checkboxState.gostam} onChange={handleCheckboxChange} id="gostam" />
                                            <label className="form-check-label" htmlFor="gostam">
                                                O que mais gostam
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="redor" checked={checkboxState.redor} onChange={handleCheckboxChange} id="redor" />
                                            <label className="form-check-label" htmlFor="redor">
                                                O que tem o seu redor
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Qual grau?</label>
                                    <select value={selectedOption} onChange={handleOptionChange}>
                                        <option value="">Escolha uma opção</option>
                                        <option value="Ensino fundamental">Ensino fundamental</option>
                                        <option value="Ensino médio">Ensino médio</option>
                                        <option value="Ensino superior">Ensino superior</option>
                                        <option value="Técnico">Técnico</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewProjectPage;
