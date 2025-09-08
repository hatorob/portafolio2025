import './Skills.scss';
import { FaAngular, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPhp, FaDatabase, FaGitAlt  } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript, SiMysql  } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import type { ReactNode } from 'react';

export type SkillKey =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "angular"
  | "react"
  | "nodejs"
  | "php"
  | "db"
  | "mysql"
  | "mongodb"
  | "postgresql"
  | "git";

const technologies: Record<SkillKey, ReactNode> = {
    "html": <FaHtml5 className='icon-skills icon-frontend' title="HTML5"/>,
    "css": <FaCss3Alt className='icon-skills icon-frontend' title="CSS"/>,
    "javascript": <IoLogoJavascript className='icon-skills icon-frontend' title="JAVASCRIPT" />,
    "typescript": <SiTypescript className='icon-skills icon-frontend' title="TYPESCRIPT"/>,
    "angular": <FaAngular className='icon-skills icon-frontend' title="ANGULAR"/>,
    "react": <FaReact className='icon-skills icon-frontend' title="REACT"/>,
    "nodejs": <FaNodeJs className='icon-skills icon-backend' title="NODE.JS"/>,
    "php": <FaPhp className='icon-skills icon-backend' title="PHP"/>,
    "db": <FaDatabase className='icon-skills icon-backend' title="BASE DE DATOS" />,
    "mysql": <SiMysql className='icon-skills icon-backend' title="MYSQL" />,
    "mongodb": <DiMongodb className='icon-skills icon-backend' title="MONGODB"/>,
    "postgresql": <BiLogoPostgresql className='icon-skills icon-backend' title="POSTGRESQL"/>,
    "git": <FaGitAlt className='icon-skills icon-backend' title="GIT"/>,
}

type Props = {
    skills: SkillKey[]
}


export const Skills = ( {skills}: Props ) => {

    /* console.log(skills); */

    return (
        <div className='container-skills'>
            {
                skills.map( skill => (<div key={`icon-${skill}`}>{technologies[skill]}</div>))
            }
        </div>
    )
}
