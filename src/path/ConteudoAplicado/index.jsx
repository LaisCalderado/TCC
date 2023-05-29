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

  const handleCreateProject = () => {
    // Lógica para criar um novo projeto com as escolhas selecionadas
    console.log("Novo projeto criado:", selectedGrau, selectedSerie, selectedDisciplina);
  };

  const saveChoicesToDatabase = () => {
    const newChoices = {
      selectedGrau,
      selectedSerie,
      selectedDisciplina,
    };

    // Converter o objeto JSON em uma string JSON
    const jsonString = JSON.stringify(newChoices);

    try {
      // Salvar a string JSON no banco de dados
      // (substitua essa lógica com o código adequado para o seu caso)
      console.log("Escolhas salvas no banco de dados:", jsonString);
    } catch (error) {
      console.error("Erro ao salvar as escolhas no banco de dados:", error);
    }
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

      <button onClick={handleCreateProject}>Criar Projeto</button>
      <button onClick={saveChoicesToDatabase}>Salvar escolhas</button>
    </div>
  );
};

export default ConteudoAplicado;
