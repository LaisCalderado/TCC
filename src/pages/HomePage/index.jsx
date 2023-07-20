import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import Projects from "../../components/Projects ";
import "./style.css";

import 'bootstrap/dist/css/bootstrap.min.css';

const subjects = [
  {
    id: 1,
    title: "Math",
    imageSrc: "https://miro.medium.com/max/1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg",
    route: "/math"

  },
  {
    id: 2,
    title: "English",
    imageSrc: "https://fluencycorp.com/wp-content/uploads/2019/01/hardest-part-learning-english.jpg",
    route: "/english"
  },
  {
    id: 3,
    title: "Science",
    imageSrc: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg",
    route: "/science"
  },
  {
    id: 4,
    title: "History",
    imageSrc: "https://www.riohondo.edu/behavioral-and-social-sciences/wp-content/uploads/sites/39/2014/02/history-wordle.jpg",
    route: "/history"
  },
  {
    id: 5,
    title: "Art",
    imageSrc: "https://blogger.googleusercontent.com/img/a/AVvXsEgCcGjYXXYuJbmF2DgLhnm_D3H-iv4vUPAKh-IsB6T1V3oDwFJUdPjn4dAUsqp84HbHY6BlzHmHACkFlTnUK-NJe-SPqhTmYHbbxq8MDecAuXEa1YjQaRn-nlIZbnFwf7WnxiYhA9os0BngL4RgKCV6FsXmBnd21xJlEtPW7x7VIXH2dRIlzzbu69CKKw=w554-h354",
    route: "/art"
  },
  {
    id: 6,
    title: "Physical Education",
    imageSrc: "https://glentreeacademy.com/wp-content/uploads/2020/12/pasted-image-0-e1608718231291.png",
    route: "/physicalEducation"
  },
  {
    id: 7,
    title: "Music",
    imageSrc: "https://www.folhavitoria.com.br/entretenimento/blogs/na-balada/wp-content/uploads/2020/05/Música-Quarentena-800x500.jpg",
    route: "/music"
  },
  {
    id: 8,
    title: "Computer Science",
    imageSrc: "https://media.istockphoto.com/id/615749406/sv/vektor/line-web-concept-for-computer-science.jpg?s=612x612&w=is&k=20&c=Kd40wbglkIQbCRagrQedlSQX6SawJPm0jP04-twoLxE=",
    route: "/computerScience"
  },
  {
    id: 9,
    title: "Foreign Language",
    imageSrc: "https://www.asapgerman.com/wp-content/uploads/2020/02/ASAP-Web-Slider-123.jpg",
    route: "/foreignLanguage"
  },
];

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/api/projetos/");
        setProjects(response.data);
      } catch (error) {
        console.log("Erro ao buscar projetos:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleLikeProject = async (projectId) => {
    try {
      await axios.post(`http://127.0.0.1:8080/api/projetos/${projectId}/like/`);
      // Atualizar o estado de curtidas do projeto
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, likes: project.likes + 1 };
        }
        return project;
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.log("Erro ao curtir projeto:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" id="container-home">
        <div id="div-home" className="border border-dark">
          <Carousel subjects={subjects} />
        </div>
        <div id="div-home">
          <h1 className="centralizard" id="title">
            Projetos de Gameficação
          </h1>
          <p className="centralizard" id="sub-title">
            Projetos relacionados ao tema selecionados para você
          </p>
          <h1 className="centralizard">Welcome to Arcade</h1>
          <Projects projects={projects} onLike={handleLikeProject} />
        </div>
      </div>
    </>
  );
};

export default HomePage;