import React, { useState } from "react";
import SelectField from "../../components/SelectField";
import './style.css';

const Jogadores = (props) => {

    const handleEstiloAprendizagemChange = (event) => {
        props.setSelectedEstiloAprendizagem(event.target.value);
    };

    const handleInteressesChange = (event) => {
        props.setSelectedInteresses(event.target.value);
    };

    const handleHabilidadesChange = (event) => {
        props.setSelectedHabilidades(event.target.value);
    };

    return (
        <div className="conteudo-aplicado-container">
            <SelectField
                label="Estilos de aprendizagem:?"
                value={props.selectedEstiloAprendizagem}
                onChange={handleEstiloAprendizagemChange}
                options={props.estiloaprendizagem }
            />

            <SelectField
                label="Interesses?"
                value={props.selectedInteresses}
                onChange={handleInteressesChange}
                options={props.interesses} 
            />

            <SelectField
                label="Habilidades?"
                value={props.selectedHabilidades}
                onChange={handleHabilidadesChange}
                options={props.habilidades}
            />

        </div>
    );
};

export default Jogadores;