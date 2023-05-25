import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const Jogadores = () => {
    const [selectedAgeRange, setSelectedAgeRange] = useState("");
    const [selectedExperience, setSelectedExperience] = useState("");
    const [selectedObjectives, setSelectedObjectives] = useState("");
    const [selectedMotivation, setSelectedMotivation] = useState("");
    const [selectedLearningStyle, setSelectedLearningStyle] = useState("");
    const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState("");

    const handleAgeRangeChange = (event) => {
        setSelectedAgeRange(event.target.value);
    };

    const handleExperienceChange = (event) => {
        setSelectedExperience(event.target.value);
    };

    const handleObjectivesChange = (event) => {
        setSelectedObjectives(event.target.value);
    };

    const handleMotivationChange = (event) => {
        setSelectedMotivation(event.target.value);
    };

    const handleLearningStyleChange = (event) => {
        setSelectedLearningStyle(event.target.value);
    };



    const handleSpecialNeedsChange = (event) => {
        setSelectedSpecialNeeds(event.target.value);
    };

    return (
        <div>
            <SelectField
                label="Idade: Qual é a faixa etária dos jogadores?"
                value={selectedAgeRange}
                onChange={handleAgeRangeChange}
                options={[
                    { label: "16-20 anos", value: "16-20 anos" },
                    { label: "21-25 anos", value: "21-25 anos" },
                    { label: "26-30 anos", value: "26-30 anos" },
                    { label: "31+ anos", value: "31+ anos" },
                ]}
            />

            <SelectField
                label="Experiência prévia: Os jogadores já têm experiência anterior com jogos ou gamificação?"
                value={selectedExperience}
                onChange={handleExperienceChange}
                options={[
                    { label: "Sim", value: "Sim" },
                    { label: "Não", value: "Não" },
                ]}
            />


            <SelectField
                label="Objetivos: Quais são os objetivos dos jogadores ao participar da gamificação?"
                value={selectedObjectives}
                onChange={handleObjectivesChange}
                options={[
                    { label: "Aprender novas habilidades", value: "Aprender novas habilidades" },
                    { label: "Melhorar o desempenho acadêmico", value: "Melhorar o desempenho acadêmico" },
                    { label: "Socializar com outros jogadores", value: "Socializar com outros jogadores" },
                    { label: "Divertir-se e relaxar", value: "Divertir-se e relaxar" },
                    { label: "Alcançar metas pessoais", value: "Alcançar metas pessoais" },
                ]}
            />

            <SelectField
                label="Motivação: O que motiva os jogadores a participar e se envolver na gamificação?"
                value={selectedMotivation}
                onChange={handleMotivationChange}
                options={[
                    { label: "Competição e rankings", value: "Competição e rankings" },
                    { label: "Recompensas e conquistas", value: "Recompensas e conquistas" },
                    { label: "Colaboração e trabalho em equipe", value: "Colaboração e trabalho em equipe" },
                    { label: "Autoexpressão e criatividade", value: "Autoexpressão e criatividade" },
                    { label: "Desafios e superação de obstáculos", value: "Desafios e superação de obstáculos" },
                ]}
            />

            <SelectField
                label="Estilos de aprendizagem: Como os jogadores preferem aprender e absorver informações?"
                value={selectedLearningStyle}
                onChange={handleLearningStyleChange}
                options={[
                    { label: "Visual (imagens e gráficos)", value: "Visual (imagens e gráficos)" },
                    { label: "Auditivo (áudio e música)", value: "Auditivo (áudio e música)" },
                    { label: "Cinestésico (experiências práticas)", value: "Cinestésico (experiências práticas)" },
                    { label: "Leitura e escrita", value: "Leitura e escrita" },
                ]}
            />



            <SelectField
                label="Necessidades especiais: Existem necessidades especiais ou requisitos específicos que os jogadores possuem e que devem ser considerados na gamificação?"
                value={selectedSpecialNeeds}
                onChange={handleSpecialNeedsChange}
                options={[
                    { label: "Deficiência visual", value: "Deficiência visual" },
                    { label: "Deficiência auditiva", value: "Deficiência auditiva" },
                    { label: "Deficiência motora", value: "Deficiência motora" },
                    { label: "Transtorno do espectro autista", value: "Transtorno do espectro autista" },
                    { label: "Outras necessidades especiais", value: "Outras necessidades especiais" },
                ]}
            />
        </div>
    );
};

export default Jogadores;
