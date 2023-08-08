// ButtonDelete.js

import React from "react";
import Swal from "sweetalert2";
import api from "../config/api";


const ButtonDelete = ({ projetoId, fetchUserProjects }) => {
  const deletarProjeto = () => {
    // Verifique se o usuário realmente deseja excluir o projeto
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Faça a requisição para o backend para remover o projeto do banco de dados
        api
          .delete(`/projetos/${projetoId}/`)
          .then(() => {
            // Se a requisição for bem sucedida, atualize a lista de projetos do usuário
            fetchUserProjects();
            Swal.fire({
              title: "Deletado!",
              text: "O projeto foi deletado com sucesso.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Erro ao deletar projeto:", error);
            Swal.fire({
              title: "Erro!",
              text:
                "Ocorreu um erro ao deletar o projeto. Por favor, tente novamente mais tarde.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <button className="btn btn-danger mt-3" onClick={deletarProjeto}>
      Deletar Projeto
    </button>
  );
};

export default ButtonDelete;
