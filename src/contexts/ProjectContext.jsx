import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [checkboxState, setCheckboxState] = useState({
    conteudoAplicado: false,
    jogadores: false,
    gostam: false,
    redor: false,
  });
  const [selectedEnvironment, setSelectedEnvironment] = useState("");

  const updateSelectedOption = (option) => {
    setSelectedOption(option);
  };

  const updateCheckboxState = (name, value) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateSelectedEnvironment = (environment) => {
    setSelectedEnvironment(environment);
  };

  return (
    <ProjectContext.Provider
      value={{
        selectedOption,
        checkboxState,
        selectedEnvironment,
        updateSelectedOption,
        updateCheckboxState,
        updateSelectedEnvironment,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
