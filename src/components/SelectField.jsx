import React from "react";

const SelectField = ({ label, value, onChange, options, onDataChange }) => {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);

        // Verifica se onDataChange foi fornecido como prop e chama-o com os dados selecionados
        if (onDataChange) {
            const selectedOption = options.find((option) => option.value === selectedValue);
            onDataChange(selectedOption);
        }
    };
    return (
        <div className="form-group">
            <label>{label}</label>
            <select className="form-control" value={value} onChange={onChange}>
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
