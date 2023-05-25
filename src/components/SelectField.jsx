import React from "react";

const SelectField = ({ label, value, onChange, options }) => {
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
