import React, { useStatet } from "react";
import SelectField from "../../components/SelectField";

const Gostam = (props) => {

    const handleRecompensasVirtuaisChange = (event) => {
        props.setSelectedRecompensasVirtuais(event.target.value);
    };

    const handleCompeticaoDesafiosChange = (event) => {
        props.setSelectedCompeticaoDesafios(event.target.value);
    };

    return (

        <div className="conteudo-aplicado-container">
            <SelectField
                label="Recompensas virtuais:"
                value={props.selectedRecompensasVirtuais}
                onChange={handleRecompensasVirtuaisChange}
                options={props.recompensasVirtuais}
            />

            <SelectField
                label="Competições e desafios:"
                value={props.selectedCompeticaoDesafios}
                onChange={handleCompeticaoDesafiosChange}
                options={props.competicaoDesafios}
            />
        </div>
    );
};

export default Gostam;
