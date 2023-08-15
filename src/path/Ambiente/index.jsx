import React, { useState } from "react";
import SelectField from "../../components/SelectField";


const Ambiente = (props) => {

  const handleProblemasEnfrentadosChange = (event) => {
    props.setSelectedProblemasEnfrentados(event.target.value);
  };

  const handleRegraChange = (event) => {
    props.setSelectedRegras(event.target.value);
  };

  const handleDisciplinaChange = (event) => {
    props.setSelectedDisciplina(event.target.value);
  };


  return (
    <div className="conteudo-aplicado-container">
      <SelectField
        label="Problemas enfrentados?"
        value={props.selectedProblemasEnfrentados}
        onChange={handleProblemasEnfrentadosChange}
        options={props.problemasenfrentados}
      />

      <SelectField
        label="Qual Série?"
        value={props.selectedRegra}
        onChange={handleRegraChange}
        options={props.regras}
      />
    </div>
  );
};

export default Ambiente;
