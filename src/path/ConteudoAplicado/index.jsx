import React, { useState } from "react";
import SelectField from "../../components/SelectField";
import "./style.css"; 

const ConteudoAplicado = (props) => {

  const handleGrauChange = (event) => {
    props.setSelectedGrau(event.target.value);
  };

  const handleSerieChange = (event) => {
    props.setSelectedSerie(event.target.value);
  };

  const handleDisciplinaChange = (event) => {
    props.setSelectedDisciplina(event.target.value);
  };


  return (
    <div className="conteudo-aplicado-container"> 
      <SelectField
        label="Qual Grau?"
        value={props.selectedGrau}
        onChange={handleGrauChange}
        options={props.graus}
      />

      <SelectField
        label="Qual Série?"
        value={props.selectedSerie}
        onChange={handleSerieChange}
        options={props.series}
      />

      <SelectField
        label="Qual Disciplina?"
        value={props.selectedDisciplina}
        onChange={handleDisciplinaChange}
        options={props.disciplinas}
      />
    </div>
  );
};

export default ConteudoAplicado;
