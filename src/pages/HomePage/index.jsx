import React, { useState, useContext } from "react";
import { Carousel } from 'react-bootstrap';
import { AuthContext } from "../../contexts/auth";
import Navbar from '../../components/Navbar';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
//const subjectColors = ["#F94144", "#F3722C", "#F8961E", "#F9844A", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590",];
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
    {   id: 3,
        title: "Science",
        imageSrc: "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg",
        route: "/science"
    },
    {   id: 4,
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
    {   id: 6,
        title: "Physical Education",
        imageSrc: "https://glentreeacademy.com/wp-content/uploads/2020/12/pasted-image-0-e1608718231291.png",
        route: "/physicalEducation"
    },
    {   id: 7,
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

const Project = ({ title, backgroundImage, description, views, likes }) => {
    return (
      <div className="project">
        <div className="project-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div className="project-content">
          <h2 className="project-title">{title}</h2>
          <p className="project-description">{description}</p>
          <div className="project-stats">
            <p className="project-views">{views} views</p>
            <p className="project-likes">{likes} likes</p>
          </div>
        </div>
      </div>
    );
  }


const HomePage = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
      logout();
    };
  
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    
    const [projectDetails, setProjectDetails] = useState(null);
    const handleCreateProject = () => {
      // Aqui você deve adicionar a lógica para criar o projeto e obter suas informações
      const project = {
        title: 'Meu projeto',
        backgroundImage: 'https://exemplo.com/imagem.jpg',
        description: 'Descrição do meu projeto',
        views: 10,
        likes: 5,
      };
      setProjectDetails(project);
    };   


    return (
        <>
          <Navbar />
          <div className="container" id="container-home">
            <div id="div-home" className="container">
              <Carousel 
                activeIndex={index} 
                onSelect={handleSelect}>
                {subjects.map((subject) => (
                  <Carousel.Item key={subject.id}>
                    <Link to={subject.route}>
                      <img className="d-block w-100" src={subject.imageSrc} alt={subject.title} />
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="border border-dark" id="div-home">
              <h1 className="centralizard">Projetos de Gameficação</h1>
              <p className="centralizard">Projetos relacionados ao tema selecionados para você</p>
              <p className="centralizard">{String(authenticated)}</p>
              <button onClick={handleLogout}>Logout</button>
              <h1>Welcome to Arcade</h1>
            </div>
          </div>
          <div className="container" id="container-home">
            <div className="home-page">
              <div className="project-list">
                <Project
                  title="Project 1"
                  backgroundImage="https://via.placeholder.com/500x300/ff0000/ffffff"
                  description="This is the first project"
                  views={10}
                  likes={5}
                />
                <Project
                  title="Project 2"
                  backgroundImage="https://via.placeholder.com/500x300/00ff00/ffffff"
                  description="This is the second project"
                  views={20}
                  likes={10}
                />
                <Project
                  title="Project 3"
                  backgroundImage="https://via.placeholder.com/500x300/0000ff/ffffff"
                  description="This is the third project"
                  views={30}
                  likes={15}
                />
              </div>
            </div>
          </div>
        </>
      );

};

export default HomePage