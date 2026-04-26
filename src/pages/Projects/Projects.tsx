import { useState } from "react";
import { useProjects } from "../../hooks/projects/useProjects";
import { SkeletonCardProject } from "../../components/Cards/CardProject/SkeletonCardProject";
import { CardProject } from "../../components/Cards/CardProject/CardProject";
import './Project.scss';

export const Projects = () => {

  const [search, setSearch] = useState("");
  const [skill, setSkill ] = useState("");
  const [type, setType ] = useState("");

  const orFilters = [];
  if (search.trim() !== "") {
    orFilters.push({
      title: { contains: search.trim() },
    });
  }

  if (skill !== "") {
    orFilters.push({
      skills: { contains: skill },
    });
  }
  if (type !== "") {
    orFilters.push({
      type: { eq: type },
    });
  }

  const { data: projects, isLoading: isLoadingProjectsProfessional } = useProjects({
    ...(orFilters.length > 0 && {
      filter: {
        or: orFilters,
      },
    }),
    orderBy: {
      field: "createdAt",
      direction: "desc",
    },
  });


  return (
    <div className="section">
          <h1>Proyectos</h1>
          <div className="container-filters ">
            <select
              style={{ backgroundColor: "#00c3ef", border: "none", borderRadius: "2rem", padding: "1rem 2rem", color: "#fff"}}
              name="technology" id="technology" onChange={(e) => setSkill(e.target.value)}>
              <option value="">Selecciona una tecnología</option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
            </select>
            
            {/* Buscador */}
            <input
              className="input-custom"
              style={{
                border: "1px solid #00c3ef",
                borderRadius: "2rem",
                padding: "1rem 2rem",
                background: "transparent",
                color: "#00c3ef"
              }}
              type="text"
              placeholder="Buscar por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              style={{ backgroundColor: "#00c3ef", border: "none", borderRadius: "2rem", padding: "1rem 2rem", color: "#fff"}}
              name="technology" id="technology" onChange={(e) => setType(e.target.value)}>
              <option value="">Seleccione tipo de proyecto</option>
              <option value="PROFESSIONAL">Profesional</option>
              <option value="ACADEMIC">Académico</option>
            </select>
          </div>
            <div className="projects-grid">
              {
                (isLoadingProjectsProfessional)
                  ? Array.from({ length: 5 }).map( (_,i) => (
                      <SkeletonCardProject key={`skeleton_card_project_professional_${i}`} index={i} />
                    ))
                  : (projects ?? []).map( (project, index) => {
                  return <CardProject key={`card_project_${project.id}`} project={project} index={index} isHome={false}/>
                })
              }
            </div>
        </div>
  )
}
