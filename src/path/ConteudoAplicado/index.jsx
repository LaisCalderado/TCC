import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const ConteudoAplicado = () => {
  const [selectedGrau, setSelectedGrau] = useState("");
  const [selectedSerie, setSelectedSerie] = useState("");
  const [selectedDisciplina, setSelectedDisciplina] = useState("");

  const handleGrauChange = (event) => {
    setSelectedGrau(event.target.value);
  };

  const handleSerieChange = (event) => {
    setSelectedSerie(event.target.value);
  };

  const handleDisciplinaChange = (event) => {
    setSelectedDisciplina(event.target.value);
  };

  return (
    <div>
      <SelectField
        label="Qual Grau?"
        value={selectedGrau}
        onChange={handleGrauChange}
        options={[
          { label: "Ensino fundamental", value: "Ensino fundamental" },
          { label: "Ensino médio", value: "Ensino médio" },
          { label: "Ensino superior", value: "Ensino superior" },
          { label: "Técnico", value: "Técnico" },
        ]}
      />

      <SelectField
        label="Qual Série?"
        value={selectedSerie}
        onChange={handleSerieChange}
        options={[
          { label: "1 Série", value: "1 Série" },
          { label: "2 Série", value: "2 Série" },
          { label: "3 Série", value: "3 Série" },
        ]}
      />

      <SelectField
        label="Qual Disciplina?"
        value={selectedDisciplina}
        onChange={handleDisciplinaChange}
        options={[
          { label: "Matemática", value: "Matemática" },
          { label: "Física", value: "Física" },
          { label: "Língua Portuguesa", value: "Língua Portuguesa" },
        ]}
      />

      {/* Renderizar outros campos específicos da página ConteudoAplicado aqui */}
    </div>
  );
};

export default ConteudoAplicado;
