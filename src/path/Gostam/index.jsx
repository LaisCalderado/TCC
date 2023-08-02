import React, { useState, createContext, useContext } from "react";
import SelectField from "../../components/SelectField";
import { database } from "../../pages/config/firebase";
import { ref, push } from "firebase/database";

// Criação do contexto
const ChoicesContext = createContext();

const Gostam = (props) => {
    const [selectedInterests, setSelectedInterests] = useState("");
    const [selectedSkills, setSelectedSkills] = useState("");
    const [selectedPersonality, setSelectedPersonality] = useState("");

    const updateChoices = (choices) => {
        setSelectedInterests(choices.selectedInterests);
        setSelectedSkills(choices.selectedSkills);
        setSelectedPersonality(choices.selectedPersonality);
    };

    const saveChoicesToDatabase = () => {
        const data = {
            selectedInterests,
            selectedSkills,
            selectedPersonality,
        };

        // Converter o objeto JSON em uma string JSON
        const jsonString = JSON.stringify(data);

        try {
            const choicesRef = ref(database, "choices");
            const newChoiceRef = push(choicesRef);
            newChoiceRef.set(data).then(() => {
                console.log("Escolhas salvas no banco de dados com sucesso!");
            });
        } catch (error) {
            console.error("Erro ao salvar as escolhas no banco de dados:", error);
        }
    };

    const saveChoicesToBackend = () => {
        const data = {
            selectedInterests,
            selectedSkills,
            selectedPersonality,
        };

        fetch("/api/saveChoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Escolhas enviadas para o backend com sucesso:", result);
            })
            .catch((error) => {
                console.error("Erro ao enviar as escolhas para o backend:", error);
            });
    };

    return (
        <ChoicesContext.Provider
            value={{
                selectedInterests,
                selectedSkills,
                selectedPersonality,
                updateChoices,
                saveChoicesToDatabase,
            }}
        >
            <div className="conteudo-aplicado-container">
                <SelectField
                    label="Interesses e preferências: Quais são os interesses e hobbies dos jogadores? Quais tipos de jogos eles gostam?"
                    value={selectedInterests}
                    onChange={(event) => setSelectedInterests(event.target.value)}
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
                    onChange={(event) => setSelectedSkills(event.target.value)}
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
                    onChange={(event) => setSelectedPersonality(event.target.value)}
                    options={[
                        { label: "Extrovertido", value: "Extrovertido" },
                        { label: "Introvertido", value: "Introvertido" },
                        { label: "Aventureiro", value: "Aventureiro" },
                        { label: "Analítico", value: "Analítico" },
                        { label: "Criativo", value: "Criativo" },
                    ]}
                />

                <ChoiceList />
            </div>
        </ChoicesContext.Provider>
    );
};

const ChoiceList = () => {
    const { selectedInterests, selectedSkills, selectedPersonality } = useContext(
        ChoicesContext
    );

    return (
        <div>
            <h3>Escolhas:</h3>
            <ul>
                {selectedInterests && <li>{selectedInterests}</li>}
                {selectedSkills && <li>{selectedSkills}</li>}
                {selectedPersonality && <li>{selectedPersonality}</li>}
            </ul>

        </div>
    );
};

export default Gostam;
