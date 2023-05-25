import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const Gostam = () => {

    const [selectedInterests, setSelectedInterests] = useState("");
    const [selectedSkills, setSelectedSkills] = useState("");
    const [selectedPersonality, setSelectedPersonality] = useState("");

    const handleInterestsChange = (event) => {
        setSelectedInterests(event.target.value);
    };

    const handleSkillsChange = (event) => {
        setSelectedSkills(event.target.value);
    };

    const handlePersonalityChange = (event) => {
        setSelectedPersonality(event.target.value);
    };


    return (
        <div>

            <SelectField
                label="Interesses e preferências: Quais são os interesses e hobbies dos jogadores? Quais tipos de jogos eles gostam?"
                value={selectedInterests}
                onChange={handleInterestsChange}
                options={[
                    { label: "Esportes", value: "Esportes" },
                    { label: "Arte e música", value: "Arte e música" },
                    { label: "Ciência e tecnologia", value: "Ciência e tecnologia" },
                    { label: "Jogos de aventura", value: "Jogos de aventura" },
                    { label: "Jogos de estratégia", value: "Jogos de estratégia" },
                ]}
            />

            <SelectField
                label="Habilidades e conhecimentos: Quais habilidades e conhecimentos os jogadores possuem que podem ser aplicados na gamificação?"
                value={selectedSkills}
                onChange={handleSkillsChange}
                options={[
                    { label: "Matemática", value: "Matemática" },
                    { label: "Ciências", value: "Ciências" },
                    { label: "Línguas estrangeiras", value: "Línguas estrangeiras" },
                    { label: "Programação e tecnologia", value: "Programação e tecnologia" },
                    { label: "Artes e criatividade", value: "Artes e criatividade" },
                ]}
            />

            <SelectField
                label="Personalidade: Existem características específicas da personalidade dos jogadores que podem influenciar sua participação na gamificação?"
                value={selectedPersonality}
                onChange={handlePersonalityChange}
                options={[
                    { label: "Extrovertido", value: "Extrovertido" },
                    { label: "Introvertido", value: "Introvertido" },
                    { label: "Aventureiro", value: "Aventureiro" },
                    { label: "Analítico", value: "Analítico" },
                    { label: "Criativo", value: "Criativo" },
                ]}
            />
        </div>

    );




};

export default Gostam;