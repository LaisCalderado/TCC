import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css"; // importando o CSS

const Projects = () => {
  const [projectList, setProjectList] = useState([
    {
      id: 1,
      title: "Atraves dos Reinos",
      imageSrc: "https://i.zst.com.br/images/os-13-melhores-jogos-de-acao-e-aventura-para-videogame-em-2019-photo193408540-44-9-3c.jpg",
      description: "Guerreiro em missão de salvar seu povo ",
      views: 20,
      likes: 10,
      liked: false,
    },
    {
      id: 2,
      title: "Caça ao Tesouro",
      imageSrc: "https://ogimg.infoglobo.com.br/in/23001849-c2f-667/FT1086A/INFOCHPDPICT000041975439.jpg",
      description: "Encontre os tesouros perdido.",
      views: 30,
      likes: 20,
      liked: false,
    },
    {
      id: 3,
      title: "Corrida maluca",
      imageSrc: "https://gametimes.com.br/wp-content/uploads/2022/05/Jogos-de-Plataforma.jpg",
      description: "Ganha quem for mais agil.",
      views: 40,
      likes: 30,
      liked: false,
    },
    {
      id: 4,
      title: "Jornada dos destemidos",
      imageSrc: "https://1.bp.blogspot.com/-0iJQPQerJjE/YL-jvR9dlYI/AAAAAAAAEis/VtlvZjQOP9ETAVmnG4O4j1B43PJGaLExwCLcBGAsYHQ/s1920/frogun.png",
      description: "Destrua os inimigos e fique mais forte.",
      views: 20,
      likes: 10,
      liked: false,
    },
    {
      id: 5,
      title: "Voando com os Drags",
      imageSrc: "https://conteudo.imguol.com.br/c/entretenimento/57/2019/10/04/yooka-laylee-1570220193579_v2_4x3.png",
      description: "Voar não é o limite.",
      views: 30,
      likes: 20,
      liked: false,
    },
    {
      id: 6,
      title: "A escola mágica da Srª Weber",
      imageSrc: "https://blog.2amgaming.com/wp-content/uploads/2019/06/chrome_l0VfpCBlkk.png",
      description: "Aprenda novas magias e sinta-se livre",
      views: 40,
      likes: 30,
      liked: false,
    },
  ]);

  const handleLike = (projectId) => {
    setProjectList((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            liked: !project.liked,
            likes: project.liked ? project.likes - 1 : project.likes + 1,
          };
        }
        return project;
      });
    });
  };

  return (
    <div className="projects">
      <div className="project-cards">
        {projectList.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.imageSrc} alt={project.title} />
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-stats">
                <p>Views: {project.views}</p>
                <p>Likes: {project.likes}</p>
              </div>
              <div className="project-actions">
                <Link to={project.route} className="view-button">
                  Visualizar Projeto
                </Link>
                <button
                  className={`like-button ${project.liked ? "liked" : ""}`}
                  onClick={() => handleLike(project.id)}
                >
                  {project.liked ? "Unlike" : "Like"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;