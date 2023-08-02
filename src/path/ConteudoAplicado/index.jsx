import React, { useState } from "react";
import SelectField from "../../components/SelectField";
import "./style.css"; 

const ConteudoAplicado = (props) => {
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
    <div className="conteudo-aplicado-container"> {/* Adicione uma classe CSS personalizada para o container */}
      <SelectField
        label="Qual Grau?"
        value={selectedGrau}
        onChange={handleGrauChange}
        options={props.graus}
      />

      <SelectField
        label="Qual Série?"
        value={selectedSerie}
        onChange={handleSerieChange}
        options={props.series}
      />

      <SelectField
        label="Qual Disciplina?"
        value={selectedDisciplina}
        onChange={handleDisciplinaChange}
        options={props.disciplinas}
      />

      <button onClick={handleCreateProject}>Criar Projeto</button>
      <button onClick={saveChoicesToDatabase}>Salvar escolhas</button>
    </div>
  );
};

export default ConteudoAplicado;
