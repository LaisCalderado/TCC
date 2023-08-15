// components/ToggleDetailsButton.js

import React from "react";
import "./ToggleDetailsButton.css"; // Importe o arquivo de estilo CSS

const ToggleDetailsButton = ({ showFullInfo, toggleShowFullInfo }) => {
    return (
        <button
            className={`btn ${showFullInfo ? "btn-danger" : "btn-primary"} mt-3 btn-block`}
            onClick={toggleShowFullInfo}
        >
            {showFullInfo ? "Esconder Detalhes" : "Ver Detalhes"}
        </button>
    );
};

export default ToggleDetailsButton;
