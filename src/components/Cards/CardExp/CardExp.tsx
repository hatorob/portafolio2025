import { formatDateRange } from '../../../utils/formateDateRange';
import './CardExp.scss';

type Props = {
    experience: Experience;
}

interface Experience {
    id: number;
    date_init: string;
    date_end: string;
    company: string;
    desc_company: string;
    rol: string;
    area: string;
    responsabilities: string[];
    skills: string[];
}


export const CardExp = ({experience}: Props) => {
    console.log(experience);
    return (
        <div className="container-cardExp">
            <div className="header">
                <span className='header-title'>{experience.company}</span>
                <span className='txt-blue header-date'>{formatDateRange(experience.date_init, experience.date_end)}</span>
            </div>
            <p className='txt-blue'>{experience.desc_company}</p>
            <p><span className='txt-green'>Cargo:</span> <span>{experience.rol}</span> </p>
            <p><span className='txt-green'>Área:</span> <span>{experience.area}</span> </p>
            <p><span className='txt-green'>Responsabilidades:</span></p>
            <ul>
                {
                    experience.responsabilities.map( (el, index) => ( <li key={`li_responsibilities_${index}`}>{el}</li> ))
                }
            </ul>
            <p><span className='txt-green'>Habilidades:</span></p>
            <ul className='container-card-skills'>
                {
                    experience.skills.map( (el, index) => ( <li key={`li_skills_${index}`}>{el}</li> ))
                }
            </ul>
        </div>
    )
}
