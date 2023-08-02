import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const AoRedor = () => {
    const [selectedRecursos, setSelectedRecursos] = useState("");
    const [selectedConfiguracaoEspaco, setSelectedConfiguracaoEspaco] = useState("");
    const [selectedRelacaoProfessorAluno, setSelectedRelacaoProfessorAluno] = useState("");
    const [selectedDisponibilidadeTecnologia, setSelectedDisponibilidadeTecnologia] = useState("");
    const [selectedNormasRegras, setSelectedNormasRegras] = useState("");

    const handleRecursosChange = (event) => {
        setSelectedRecursos(event.target.value);
    };

    const handleConfiguracaoEspacoChange = (event) => {
        setSelectedConfiguracaoEspaco(event.target.value);
    };

    const handleRelacaoProfessorAlunoChange = (event) => {
        setSelectedRelacaoProfessorAluno(event.target.value);
    };

    const handleDisponibilidadeTecnologiaChange = (event) => {
        setSelectedDisponibilidadeTecnologia(event.target.value);
    };

    const handleNormasRegrasChange = (event) => {
        setSelectedNormasRegras(event.target.value);
    };

    const saveChoicesToDatabase = () => {
        const newChoices = {
            selectedRecursos,
            selectedConfiguracaoEspaco,
            selectedRelacaoProfessorAluno,
            selectedDisponibilidadeTecnologia,
            selectedNormasRegras,
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
        <div className="conteudo-aplicado-container">
            <SelectField
                label="Recursos disponíveis: Quais recursos físicos estão disponíveis na sala de aula que podem ser utilizados na gamificação?"
                value={selectedRecursos}
                onChange={handleRecursosChange}
                options={[
                    { label: "Quadro branco", value: "Quadro branco" },
                    { label: "Projetor multimídia", value: "Projetor multimídia" },
                    { label: "Computador", value: "Computador" },
                    { label: "Livros didáticos", value: "Livros didáticos" },
                    { label: "Material manipulativo", value: "Material manipulativo" },
                ]}
            />

            <SelectField
                label="Configuração do espaço: Como a sala de aula está organizada para facilitar a gamificação? Existem áreas específicas designadas para diferentes atividades?"
                value={selectedConfiguracaoEspaco}
                onChange={handleConfiguracaoEspacoChange}
                options={[
                    { label: "Áreas de trabalho em grupo", value: "Áreas de trabalho em grupo" },
                    { label: "Estações de aprendizagem", value: "Estações de aprendizagem" },
                    { label: "Cantos temáticos", value: "Cantos temáticos" },
                    { label: "Espaço para apresentações", value: "Espaço para apresentações" },
                    { label: "Mesas e cadeiras dispostas em formato circular", value: "Mesas e cadeiras dispostas em formato circular" },
                ]}
            />

            <SelectField
                label="Relação professor-aluno: Qual é a dinâmica e o relacionamento entre o professor e os alunos que podem afetar a gamificação?"
                value={selectedRelacaoProfessorAluno}
                onChange={handleRelacaoProfessorAlunoChange}
                options={[
                    { label: "Professor como facilitador", value: "Professor como facilitador" },
                    { label: "Colaboração entre professor e alunos", value: "Colaboração entre professor e alunos" },
                    { label: "Abordagem de ensino tradicional", value: "Abordagem de ensino tradicional" },
                    { label: "Participação ativa dos alunos", value: "Participação ativa dos alunos" },
                    { label: "Feedback frequente do professor", value: "Feedback frequente do professor" },
                ]}
            />

            <SelectField
                label="Disponibilidade de tecnologia: Que recursos tecnológicos estão disponíveis na sala de aula que podem ser incorporados à gamificação?"
                value={selectedDisponibilidadeTecnologia}
                onChange={handleDisponibilidadeTecnologiaChange}
                options={[
                    { label: "Computadores", value: "Computadores" },
                    { label: "Tablets", value: "Tablets" },
                    { label: "Smartphones", value: "Smartphones" },
                    { label: "Projetor multimídia", value: "Projetor multimídia" },
                    { label: "Lousa digital", value: "Lousa digital" },
                ]}
            />

            <SelectField
                label="Normas e regras: Quais são as normas e regras da sala de aula que devem ser consideradas ao implementar a gamificação?"
                value={selectedNormasRegras}
                onChange={handleNormasRegrasChange}
                options={[
                    { label: "Respeito aos colegas", value: "Respeito aos colegas" },
                    { label: "Uso adequado dos recursos", value: "Uso adequado dos recursos" },
                    { label: "Cumprimento de prazos", value: "Cumprimento de prazos" },
                    { label: "Participação ativa nas atividades", value: "Participação ativa nas atividades" },
                    { label: "Responsabilidade individual", value: "Responsabilidade individual" },
                ]}
            />

            <button onClick={saveChoicesToDatabase}>Salvar escolhas</button>
        </div>
    );
};

export default AoRedor;
