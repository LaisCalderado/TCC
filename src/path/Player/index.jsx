import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const Player = (props) => {

  const handleDetalhesChange = (event) => {
    props.setSelectedDetalhes(event.target.value);
  };

  const handleHitoriaJogadorChange = (event) => {
    props.setSelectedSerie(event.target.value);
  };


  return (
    <div className="conteudo-aplicado-container">
      <SelectField
        label="Detalhes pessoais,fisiológicos e outros:?"
        value={props.selectedDetalhes}
        onChange={handleDetalhesChange}
        options={props.detalhes}
      />

      <SelectField
        label="História dos jogadores?"
        value={props.selectedHistoriajogador}
        onChange={handleHitoriaJogadorChange}
        options={props.historiajogador}
      />
    </div>
  );
};

export default Player;
