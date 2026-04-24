import "./CardProject.scss";
import { Skills, type SkillKey } from "../../Skills/Skills";
import { useStorageUrl } from "../../../hooks/storage/useStorageUrl";

type Props = {
    project: Project;
    index: number
}

export interface Project {
    id: number;
    title: string;
    imageKey: string;
    demoUrl: string;
    shortDescription: string;
    skills: SkillKey[];
}

export const CardProject = ({project, index}: Props) => {

    const { title, imageKey, demoUrl, shortDescription, skills } = project;

    const imageUrl = useStorageUrl(imageKey);

    return (
        <div className={`card-project ${index % 2 === 0 ? "left" : "right"}`}>
            <div className="card-project-container-img">
                <a href={`${demoUrl}`} target="_blank">
                    <img className="card-project-img" src={`${imageUrl}`} alt="imagen portada proyecto" loading='lazy' />
                </a>
            </div>
            <div className="card-project-container-desc">
                <h4 className="txt-blue">{title}</h4>
                <p>{shortDescription}</p>
                <Skills skills={skills}/>
            </div>
        </div>
    )
}
