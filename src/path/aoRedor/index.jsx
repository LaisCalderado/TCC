import React, { useState } from "react";
import SelectField from "../../components/SelectField";

const AoRedor = (props) => {

    const handleRecursosChange = (event) => {
        props.setSelectedRecursos(event.target.value);
    };

    const handleConfiguracaoEspacoChange = (event) => {
        props.setSelectedConfiguracaoEspaco(event.target.value);
    };

    const handleRelacaoProfessorAlunoChange = (event) => {
        props.setSelectedRelacaoProfessorAluno(event.target.value);
    };

    const handleDisponibilidadeTecnologiaChange = (event) => {
        props.setSelectedDisponibilidadeTecnologia(event.target.value);
    };

    const handleNormasRegrasChange = (event) => {
        props.setSelectedNormasRegras(event.target.value);
    };


    return (
        <div className="conteudo-aplicado-container">
            <SelectField
                label="Recursos disponíveis: Quais recursos físicos estão disponíveis na sala de aula que podem ser utilizados na gamificação?"
                value={props.selectedRecursos}
                onChange={handleRecursosChange}
                options={props.recursos}
            />

            <SelectField
                label="Configuração do espaço: Como a sala de aula está organizada para facilitar a gamificação? Existem áreas específicas designadas para diferentes atividades?"
                value={props.selectedConfiguracaoEspaco}
                onChange={handleConfiguracaoEspacoChange}
                options={props.configuracaoespaco}
            />

            <SelectField
                label="Relação professor-aluno: Qual é a dinâmica e o relacionamento entre o professor e os alunos que podem afetar a gamificação?"
                value={props.selectedRelacaoProfessorAluno}
                onChange={handleRelacaoProfessorAlunoChange}
                options={props.relacaoprofessoraluno}
            />

            <SelectField
                label="Disponibilidade de tecnologia: Que recursos tecnológicos estão disponíveis na sala de aula que podem ser incorporados à gamificação?"
                value={props.selectedDisponibilidadeTecnologia}
                onChange={handleDisponibilidadeTecnologiaChange}
                options={props.disponibilidadetec}
            />

            <SelectField
                label="Normas e regras: Quais são as normas e regras da sala de aula que devem ser consideradas ao implementar a gamificação?"
                value={props.selectedNormasRegras}
                onChange={handleNormasRegrasChange}
                options={props.normasregras}
            />
        </div>
    );
};

export default AoRedor;
