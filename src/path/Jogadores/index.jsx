import React, { useState } from "react";
import SelectField from "../../components/SelectField";
import { database } from "../../pages/config/firebase";
import { ref, push, set } from "firebase/database";
import './style.css';

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

    const saveChoicesToDatabase = () => {
        const data = {
            ageRange: selectedAgeRange,
            experience: selectedExperience,
            objectives: selectedObjectives,
            motivation: selectedMotivation,
            learningStyle: selectedLearningStyle,
            specialNeeds: selectedSpecialNeeds,
        };

        try {
            const choicesRef = ref(database, "choices");
            const newChoiceRef = push(choicesRef);
            set(newChoiceRef, data).then(() => {
                console.log("Dados salvos no banco de dados com sucesso!");
            });
        } catch (error) {
            console.error("Erro ao salvar os dados no banco de dados:", error);
        }
    };

    return (
        <div className="conteudo-aplicado-container">
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
                    { label: "Melhorar habilidades existentes", value: "Melhorar habilidades existentes" },
                    { label: "Motivação/engajamento", value: "Motivação/engajamento" },
                    { label: "Trabalho em equipe", value: "Trabalho em equipe" },
                    { label: "Competição", value: "Competição" },
                    { label: "Outro", value: "Outro" },
                ]}
            />

            <SelectField
                label="Motivação: O que motiva os jogadores a participarem da gamificação?"
                value={selectedMotivation}
                onChange={handleMotivationChange}
                options={[
                    { label: "Recompensas/prêmios", value: "Recompensas/prêmios" },
                    { label: "Reconhecimento/reputação", value: "Reconhecimento/reputação" },
                    { label: "Desafios", value: "Desafios" },
                    { label: "Divertimento/entretenimento", value: "Divertimento/entretenimento" },
                    { label: "Aprendizado", value: "Aprendizado" },
                    { label: "Outro", value: "Outro" },
                ]}
            />

            <SelectField
                label="Estilo de aprendizado: Como os jogadores preferem aprender?"
                value={selectedLearningStyle}
                onChange={handleLearningStyleChange}
                options={[
                    { label: "Visual (através de imagens e gráficos)", value: "Visual (através de imagens e gráficos)" },
                    { label: "Auditivo (através de áudio e explicações verbais)", value: "Auditivo (através de áudio e explicações verbais)" },
                    { label: "Cinestésico (através de atividades práticas e experiências)", value: "Cinestésico (através de atividades práticas e experiências)" },
                    { label: "Leitura/escrita (através de leitura e anotações)", value: "Leitura/escrita (através de leitura e anotações)" },
                    { label: "Outro", value: "Outro" },
                ]}
            />

            <SelectField
                label="Necessidades especiais: Os jogadores possuem necessidades especiais que devem ser consideradas?"
                value={selectedSpecialNeeds}
                onChange={handleSpecialNeedsChange}
                options={[
                    { label: "Sim", value: "Sim" },
                    { label: "Não", value: "Não" },
                ]}
            />

            <button onClick={saveChoicesToDatabase}>Salvar</button>
        </div>
    );
};

export default Jogadores;
