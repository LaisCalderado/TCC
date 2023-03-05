import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Verbo “to be”',
    description: 'Projeto de Verbo “to be” com exemplos e exercícios resolvidos.',
    imageUrl: 'https://picsum.photos/400/200',
    views: 300,
    likes: 20
  },
  {
    id: 2,
    title: 'Verbos auxiliares e de ação',
    description: 'Projeto Verbos auxiliares e de ação e exercícios.',
    imageUrl: 'https://picsum.photos/400/200',
    views: 250,
    likes: 15
  },
  {
    id: 3,
    title: 'Adjetivos comuns e demonstrativos',
    description: 'Projeto de adjetivos comuns e demonstrativos com exemplos práticos e exercícios resolvidos.',
    imageUrl: 'https://picsum.photos/400/200',
    views: 400,
    likes: 30
  }
];

function Project(props) {
  const { project } = props;
  
  return (
    <div className="project">
      <div className="project-background" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
      <div className="project-info">
        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">{project.description}</p>
        <div className="project-stats">
          <span className="project-views">{project.views} views</span>
          <span className="project-likes">{project.likes} likes</span>
        </div>
        <button className="btn-custom">Ver Projeto</button>
      </div>
    </div>
  );
}

function MathProjectsPage() {
  return (
    <div className="home-page">
      <h1>Projetos de Ingles</h1>
      <div className="project-list">
        {projects.map(project => <Project key={project.id} project={project} />)}
      </div>
    </div>
  );
}

export default MathProjectsPage;
