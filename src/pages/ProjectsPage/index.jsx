import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ButtonDelete from "../../components/ButtonDelete";
import LikeButton from "../../components/LikeButton";
import ToggleDetailsButton from "../../components/ToggleDetailsButton";

import api from "../../config/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";


const Project = ({ project, onDelete, onLike }) => {
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
          <ButtonDelete projetoId={id} onDelete={onDelete} />
        </div>
        {showFullInfo ? (
          <>
            <p>Likes: {project.likes}</p>
            <p>Data de criação: {project.create_at}</p>
            <p>Conteúdo: {project.conteudo}</p>
            <p>Grau de aplicação: {project.grauAplicacao}</p>
            <p>Series: {project.series}</p>
            <p>Disciplinas: {project.disciplinas}</p>
            <p>Estilo de aprendizagem: {project.estilo_aprendizagem}</p>
            <p>Interesses: {project.interesses}</p>
            <p>Habilidades: {project.habilidades}</p>
            <p>Recompensas Virtuais: {project.recompensasVirtuais}</p>
            <p>Competição/Desafios: {project.competicaoDesafios}</p>
            <p>Recursos: {project.recursos}</p>
            <p>Configuração de espaço: {project.configuracaoespaco}</p>
            <p>Professor/Aluno: {project.professorAluno}</p>
            <p>Disponibilidade Técnica: {project.disponibilidadeTec}</p>
            <p>Normas/Regras: {project.normasRegras}</p>
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


  const toggleShowFullProjectInfo = () => {
    setShowFullProjectInfo(!showFullProjectInfo);
  };

  useEffect(() => {
    console.log(localStorage.getItem('user'))
    let id = localStorage.getItem('user_id')
    // Buscar projetos da API
    api.get(`/projetos/?usuario=${id}`)
      .then((res) => {
        setProjectsList(res.data); // Supondo que a API retorna um array de projetos
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="ProjectsPage container ">
        <h1 className="mt-3 ">Meus Projetos</h1>
        <div className="row justify-content-center">
          {projectsList.map((project) => (
            <div key={project.id} className="col-lg-3">
              <Project project={project} />
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