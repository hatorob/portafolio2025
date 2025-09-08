import "./CardProject.scss";
import { Skills, type SkillKey } from "../../Skills/Skills";

type Props = {
    project: Project;
    index: number
}

interface Project {
    id: number;
    titule: string;
    img: string;
    url: string;
    desc_short: string;
    skills: SkillKey[];
}

export const CardProject = ({project, index}: Props) => {

    const { titule, img, url, desc_short, skills } = project;

    return (
        <div className={`card-project ${index % 2 === 0 ? "left" : "right"}`}>
            <div className="card-project-container-img">
                <a href={`${url}`} target="_blank">
                    <img className="card-project-img" src={`${img}`} alt="imagen portada proyecto" />
                </a>
            </div>
            <div className="card-project-container-desc">
                <h4 className="txt-blue">{titule}</h4>
                <p>{desc_short}</p>
                <Skills skills={skills}/>
            </div>
        </div>
    )
}
