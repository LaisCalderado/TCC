import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import 'react-alice-carousel/lib/alice-carousel.css';
import $ from 'jquery';

import Navbar from '../../components/Navbar';
import Carousel from "../../components/Carousel";
import Projects  from "../../components/Projects ";
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const itemsPerSlide = 5;
let currentSlide = 0;

function showSlides() {
  let firstItemIndex = currentSlide * itemsPerSlide;
  let lastItemIndex = firstItemIndex + itemsPerSlide - 1;

  // Add 'active' class to items in the current slide
  $('.carousel-item').removeClass('active');
  $('.carousel-item').slice(firstItemIndex, lastItemIndex + 1).addClass('active');

  // Hide all items and show only items with 'active' class
  $('.carousel-item').hide();
  $('.carousel-item.active').show();

  // Update slide indicators
  $('.carousel-indicators li').removeClass('active');
  $('.carousel-indicators li').eq(currentSlide).addClass('active');
}

$(document).ready(function () {
  // Initialize slides
  showSlides();

  // Handle prev/next slide buttons
  $('.carousel-control-prev').click(function () {
    currentSlide = Math.max(currentSlide - 1, 0);
    showSlides();
  });
  $('.carousel-control-next').click(function () {
    let numItems = $('.carousel-item').length;
    let lastSlide = Math.floor(numItems / itemsPerSlide);
    currentSlide = Math.min(currentSlide + 1, lastSlide);
    showSlides();
  });
});

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
  
  const { authenticated, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // usuário não autenticado, redireciona para a página de login
        window.location.replace("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <>
      <Navbar />
      <div className="container" id="container-home">
        <div id="div-home" className="border border-dark">
          <Carousel subjects={subjects} />
        </div>
        <div id="div-home">
          <h1 className="centralizard" id="title">Projetos de Gameficação</h1>
          <p className="centralizard" id="sub-title">Projetos relacionados ao tema selecionados para você</p>
          <h1 className="centralizard">Welcome to Arcade</h1>
          <Projects projects={projects}/>
        </div>
      </div>
    </>
  );

};

export default HomePage