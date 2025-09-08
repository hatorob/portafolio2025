import { CardExp } from '../../components/Cards/CardExp/CardExp';
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
    </div>
  )
}
