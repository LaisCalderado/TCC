import {Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./style.css";

const projects = [
  {
    id: 1,
    title: "Projeto 1",
    description: "Primeiro Projeto",
    views: 10,
    likes: 5,
    imageUrl: "https://picsum.photos/id/100/200/300",
  },
  {
    id: 2,
    title: "Projeto 2",
    description: "Segundo Projeto",
    views: 20,
    likes: 8,
    imageUrl: "https://picsum.photos/id/200/200/300",
  },
  {
    id: 3,
    title: "Projeto 3",
    description: "Terceiro Projeto",
    views: 30,
    likes: 12,
    imageUrl: "https://picsum.photos/id/300/200/300",
  },
];

const Project = ({ project, onDelete, onLike }) => {
  const { id, title, description, views, likes, imageUrl } = project;
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      onLike(id, false); // Informa que o like está sendo removido
    } else {
      setLiked(true);
      onLike(id, true); // Informa que o like está sendo adicionado
    }
  };


  return (
    <>
      <div className="project">
        <div
          className="project-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="project-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Views: {views}</p>
          <div className="like-buttons">
            <button
              className={`like-button ${liked ? "liked" : ""}`}
              onClick={handleLike}
            >
              {liked ? "Unlike" : "Like"}
            </button>
          </div>
          <p>Likes: {likes}</p>
          <button onClick={() => onDelete(id)}>Deletar Projeto</button>
        </div>
      </div>
    </>
  );
};


const ProjectsPage = () => {
  const [projectsList, setProjectsList] = useState(projects);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [recommendedProjects, setRecommendedProjects] = useState([]);

  const handleDeleteProject = (id) => {
    const updatedProjectsList = projectsList.filter(
      (project) => project.id !== id
    );
    setProjectsList(updatedProjectsList);
  };

  const handleLikeProject = (id, isLiked) => {
    const updatedProjectsList = projectsList.map((project) => {
      if (project.id === id) {
        if (isLiked) {
          return {
            ...project,
            likes: project.likes + 1,
          };
        } else {
          return {
            ...project,
            likes: project.likes - 1,
          };
        }
      }
      return project;
    });
    setProjectsList(updatedProjectsList);
  };

  const handleDislikeProject = (id) => {
    const updatedProjectsList = projectsList.map((project) => {
      if (project.id === id) {
        return {
          ...project,
          dislikes: project.dislikes + 1,
        };
      }
      return project;
    });
    setProjectsList(updatedProjectsList);
  };

  useEffect(() => {
    // Algoritmo de recomendação
    const recommended = projectsList.filter((project) => project.likes > 0);
    setRecommendedProjects(recommended);
  }, [projectsList]);

  const handleCreateProject = (event) => {
    event.preventDefault();

    const newProject = {
      id: Date.now(),
      title: newProjectTitle,
      description: newProjectDescription,
      views: 0,
      likes: 0,
      dislikes: 0,
      imageUrl: "https://picsum.photos/200/300",
    };

    const updatedProjectsList = [...projectsList, newProject];
    setProjectsList(updatedProjectsList);
    setNewProjectTitle("");
    setNewProjectDescription("");
    setShowForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="ProjectsPage">
        <h1>Meus Projetos</h1>
        <div className="projects-list">
          {projectsList.map((project) => (
            <Project
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
              onLike={handleLikeProject}
            />
          ))}
          {!showForm && (
            <div className="project create">
              <Link to="/new-project">
                <span>+</span>
                <p>Criar novo Projeto</p>
              </Link>
            </div>
          )}
        </div>

        <h2>Projetos Recomendados</h2>
        <div className="recommended-projects">
          {recommendedProjects.map((project) => (
            <Project
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
              onLike={handleLikeProject}
              onDislike={handleDislikeProject}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
