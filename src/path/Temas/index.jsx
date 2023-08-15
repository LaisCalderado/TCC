import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const Temas = (props) => {

    const handleTemasChange = (event) => {
        props.setSelectedTemas(event.target.value);
    };


    return (
        <div className="conteudo-aplicado-container">
            <SelectField
                label="Qual Tema?"
                value={props.selectedGrau}
                onChange={handleTemasChange}
                options={props.temas}
            />
        </div>
    );
};

export default Temas;
