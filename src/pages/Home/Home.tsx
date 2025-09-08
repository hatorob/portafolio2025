import { Link } from 'react-router-dom';
import { CardExp } from '../../components/Cards/CardExp/CardExp';
import { CardProject } from '../../components/Cards/CardProject/CardProject';
import { Skills, type SkillKey } from '../../components/Skills/Skills';
import './Home.scss';

export const Home = () => {
  const skills: SkillKey[] = [
      "html",
      "css",
      "javascript",
      "typescript",
      "angular",
      "react",
      "nodejs",
      "php",
      /* "db", */
      "mysql",
      /* "mongodb", */
      "postgresql",
      "git",
  ]


  const experiences = [
    {
      id: 1,
      date: "Agos 2023 - Feb 2024",
      company: "E-SOLUTIONS",
      desc_company: "Empresa de desarrollo de software para telecomunicaciones",
      rol: "Ingeniero de desarrollo",
      area: "Desarrollo",
      responsabilities: [
        "Correción de bugs",
        "Desarrollar funcionalidades",
        "Actualizar funcionalidades",
        "Unificación de código"
      ],
      skills: [
        "HTML",
        "CSS",
        "JAVASCRIPT",
        "JQUERY",
        "AJAX",
        "PHP",
        "MYSQL"
      ]
    },
    {
      id: 2,
      date: "Sept 2022 - Mar 2023",
      company: "E-SOLUTIONS",
      desc_company: "Empresa de desarrollo de software para telecomunicaciones",
      rol: "Ingeniero de redes",
      area: "Redes - Desarrollo",
      responsabilities: [
        "Capacitaciones a ingenieros de soporte",
        "Garantizar el monitoreo de los equipos",
        "Desarrollar funcionalidades",
        "Manipulación base de datos"
      ],
      skills: [
        "BASH",
        "LINUX",
        "SNMP",
        "ICMP",
        "REDES",
        "PHP",
        "MYSQL",
        "POWERSHELL",
      ]
    },
    {
      id: 3,
      date: "Nov 2020 - Sept 2022",
      company: "E-SOLUTIONS",
      desc_company: "Empresa de desarrollo de software para telecomunicaciones",
      rol: " Ingeniero de soporte nivel 1 - Proyecto SDM (Secretaria Distrital de Movilidad - Bogotá",
      area: "Redes",
      responsabilities: [
        "Monitoreo semafórico SDM",
        "Escalamiento de fallas",
        "Registro de nuevos equipos semaforicos",
        "Manipulación base de datos"
      ],
      skills: [
        "SNMP",
        "ICMP",
        "REDES",
        "BASH",
        "LINUX",
        "MYSQL",
      ]
    },
    {
      id: 4,
      date: "Sept 2019 - Mar 2020",
      company: "Acueducto y Alcantarillado de Bogotá",
      desc_company: "Empresa pública que administra y regula el agua potable de la ciudad de Bogotá.",
      rol: "Pasante Ingeniería de Telecomunicaciones",
      area: "DITG-EAAB",
      responsabilities: [
        "Diagnotisco de fallas",
        "Antenas y lineas de transmisión",
        "Arreglo antenas GNSS"
      ],
      skills: [
        "REDES",
        "GNSS",
        "Geolocalizaión",
      ]
    },
  ]

  const projects = [
    {
      id: 1,
      titule: "E-FAULTS | E-SOLUTIONS",
      img: "/projects/no-image.jpg",
      url: "",
      desc_short: "Este módulo consiste en el monitoreo de fallas de equipos e interfaces de E-SOLUTIONS. Mi rol consistió en cambiar el filtrado para incluir todo un arbol de equipos e interfaces a diferentes niveles del árbol jerárquico, anteriomente solo tenía grupos y subgrupos. Esta tarea desafiante implicó modificar gran parte de las funcionalidades existentes, representando un importante avance para el sistema.",
      skills: [
        "javascript",
        "php",
        "mysql",
      ]
    },
    {
      id: 2,
      titule: "E-MAP | E-SOLUTIONS",
      img: "/projects/no-image.jpg",
      url: "",
      desc_short: "Este proyecto de E-SOLUTIONS se centra en visualizar las fallas de conexión de los equipos del cliente en un mapa interactivo de Colombia. Mi labor fue integrar el filtrado jerárquico del módulo E-FAULTS, permitiendo filtrar por grupos de equipos, subgrupos, hijos y nietos. Esta mejora supuso un desafío adicional al modificar el comportamiento previo del módulo, que mostraba todas las fallas de manera general. Ahora, con el filtrado por diferentes niveles, el sistema proporciona una visión detallada y jerárquica de las fallas.",
      skills: [
        "javascript",
        "php",
        "mysql",
      ]
    },
    {
      id: 3,
      titule: "Chilling Time | Proyecto real y academico para una stand up",
      img: "/projects/ChillingTime.png",
      url: "https://chillingtime.co/",
      desc_short: "Esta página web es un proyecto final de grado que se realizo en conjunto con 6 estudiantes más del bootcamp de desarrollo web en Henry. es una página web que permite el alquiler de salas vip en aeroupuertos, cuenta con su propia pagina administradora, e-commerce para el alquiler de las salas, registro e inicio de sección para usuarios.",
      skills: [
        "react",
        "nodejs",
        "postgresql",
      ]
    },
    {
      id: 4,
      titule: "Países App | Proyecto Academico",
      img: "/projects/countryApp.png",
      url: "https://hatorob.github.io/countryApp",
      desc_short: "Esta aplicación fue desarrollada como parte de un curso de Angular. Su principal funcionalidad consiste en consumir la API de REST Countries. La aplicación ofrece diversas opciones de búsqueda, incluyendo por capital, país y región. Además, permite acceder a detalles específicos de cada país y permanencia de datos con localStorage.",
      skills: [
        "angular",
        "bootstrap",
        "javascript",
      ]
    },
  ]

  return (
    <div className='container-home'>
      <div className="container-me section">
        <div className='info-desc-one'>
          <p>Yo soy, 
            <br /> 
            <span className='txt-green'>
              Alejandro Toro 
            </span>
            <br /> 
            <span className='txt-blue'>
              Desarrollador Web Full Stack e ingeniero de telecomunicaciones
            </span>
          </p>
        </div>
        <img className="img-me" src="/me.png" alt="imagen desarrollador" width={400} height={400} />
        <div className='info-desc-two'>
          <p>Apasionado por el mundo IT, con más de <span className='txt-blue'>4 años de experiencia</span> laboral entre <span className='txt-green'>ingeniero y desarrollador.</span></p>
        </div>
      </div>
      <div className="section">
        <h3>HABILIDADES <span className='txt-green'>FRONTEND</span> - <span className='txt-blue'>BACKEND</span> </h3>
        <Skills skills={skills}/>
      </div>
      <div className="section">
        <h3 className='txt-green'>EXPERIENCIA LABORAL</h3>
        <div className="container-experience">
          {
            experiences.map( (experience) => {
              return <CardExp key={`card_experience_${experience.id}`} experience={experience} />
            })
          }
        </div>
      </div>
      <div className="section">
        <h3 className='txt-blue'>PROYECTOS</h3>
        <div className="container-projects">
          {
            projects.map( (project, index) => {
              return <CardProject key={`card_project_${project.id}`} project={project} index={index}/>
            })
          }
        </div>
        <div className='btn-more'>
          <Link to="/proyectos">Ver más</Link>
        </div>
      </div>
    </div>
  )
}
