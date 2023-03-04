import React, { useState } from "react";
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

const Project = ({ project, onDelete }) => {
  const { title, description, views, likes, imageUrl } = project;

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
          <p>Likes: {likes}</p>
          <button onClick={onDelete}>Deletar Projeto</button>
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

  const handleDeleteProject = (id) => {
    const updatedProjectsList = projectsList.filter(
      (project) => project.id !== id
    );
    setProjectsList(updatedProjectsList);
  };

  const handleCreateProject = (event) => {
    event.preventDefault();

    const newProject = {
      id: Date.now(),
      title: newProjectTitle,
      description: newProjectDescription,
      views: 0,
      likes: 0,
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
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
          {!showForm && (
            <div className="project create" onClick={() => setShowForm(true)}>
              <span>+</span>
              <p>Criar novo Projeto</p>
            </div>
          )}
          {showForm && (
            <div className="project create">
              <form onSubmit={handleCreateProject}>
                <input
                  type="text"
                  placeholder="Nome do Projeto"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Descrição do projeto"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  required
                />
                <button type="submit">Criar Projeto</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
