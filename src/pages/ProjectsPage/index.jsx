import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import LikeButton from "../../components/LikeButton";
import ToggleDetailsButton from "../../components/ToggleDetailsButton";

import api from "../../config/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";


const Project = ({ project, onLike, reloadProjetos, setReloadProjetos }) => {
  const { id, titulo, descricao, views, likes, create_at, url_imagem, conteudo,
    grauAplicacao, series, disciplinas, estilo_aprendizagem, interesses, habilidades,
    recompensasVirtuais, competicaoDesafios, recursos, configuracaoespaco,
    professorAluno, disponibilidadeTec, normasRegras } = project;
  //console.log(project.series);
  const [liked, setLiked] = useState(false);
  const [showFullInfo, setShowFullInfo] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      onLike(id, false); // Informa que o like está sendo removido
    } else {
      setLiked(true);
      onLike(id, true); // Informa que o like está sendo adicionado
    }
  };

  const toggleShowFullInfo = (props) => {
    setShowFullInfo(!showFullInfo);
  };

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
        console.log(id)
        api
          .delete(`/projetos/${id}/`)
          .then(() => {
            // Se a requisição for bem sucedida, atualize a lista de projetos do usuário
            setReloadProjetos(!reloadProjetos)
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
    <div className="card mb-4">
      <div className="card-img-top project-image" style={{ backgroundImage: `url(${project.url_imagem})` }} />
      <div className="card-body project-content">
        <h2 className="card-title">{project.titulo}</h2>
        <p>{project.series}</p>
        <p className="card-text">{project.descricao}</p>
        {showFullInfo ? <p>{project.descricao}</p> : null}

        <div className="like-buttons">
          <LikeButton liked={liked} handleLike={handleLike} />
          <ToggleDetailsButton showFullInfo={showFullInfo} toggleShowFullInfo={toggleShowFullInfo} />
          <button className="btn btn-danger mt-3" onClick={deletarProjeto}>
            Deletar Projeto
          </button>
        </div>
        {showFullInfo ? (
          <>
            <p>Likes: {project.likes}</p>
            <p>Data de criação: {project.create_at}</p>
            <p>Conteúdo: {project.conteudo}</p>
            <p>Grau de aplicação: {project.i_grauAplicacao ? project.i_grauAplicacao.descricao : ""}</p>
            <p>Series: {project.i_series ? project.i_series.descricao : ""}</p>
            <p>Disciplinas: {project.i_disciplinas ? project.i_disciplinas.descricao : ""}</p>
            <p>Estilo de aprendizagem: {project.i_estilo_aprendizagem ? project.i_estilo_aprendizagem.descricao : ""}</p>
            <p>Interesses: {project.i_interesses ? project.i_interesses.descricao : ""}</p>
            <p>Habilidades: {project.i_habilidades ? project.i_habilidades.descricao : ""}</p>
            <p>Recompensas Virtuais: {project.i_recompensasVirtuais ? project.i_recompensasVirtuais.descricao : ""}</p>
            <p>Competição/Desafios: {project.i_competicaoDesafios ? project.i_competicaoDesafios.descricao : ""}</p>
            <p>Recursos: {project.i_recursos ? project.i_recursos.descricao : ""}</p>
            <p>Configuração de espaço: {project.i_configuracaoespaco ? project.i_configuracaoespaco.descricao : ""}</p>
            <p>Professor/Aluno: {project.i_professorAluno ? project.i_professorAluno.descricao : ""}</p>
            <p>Disponibilidade Técnica: {project.i_disponibilidadeTec ? project.i_disponibilidadeTec.descricao : ""}</p>
            <p>Normas/Regras: {project.i_normasRegras ? project.i_normasRegras.descricao : ""}</p>
            {/* E assim por diante */}
          </>
        ) : null}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showFullProjectInfo, setShowFullProjectInfo] = useState(false);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [reloadProjetos, setReloadProjetos] = useState(false);

  const toggleShowFullProjectInfo = () => {
    setShowFullProjectInfo(!showFullProjectInfo);
  };

  useEffect(() => {
    console.log(localStorage.getItem('user'))
    let id = localStorage.getItem('user_id')
    // Buscar projetos da API
    api.get(`/projetos/?user=${id}`)
      .then((res) => {
        setProjectsList(res.data); // Supondo que a API retorna um array de projetos
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, [reloadProjetos]);

  return (
    <>
      <Navbar />
      <div className="ProjectsPage container ">
        <h1 className="mt-3 ">Meus Projetos</h1>
        <div className="row justify-content-center">
          {projectsList.map((project) => (
            <div key={project.id} className="col-lg-3">
              <Project project={project} reloadProjetos={reloadProjetos} setReloadProjetos={setReloadProjetos}/>

            </div>
          ))}
        </div>
      </div>
      <Link className="btn btn-primary mt-3 justify-content-center" to="/new-project">
        Criar Projeto
      </Link>
    </>
  );
};

export default ProjectsPage;