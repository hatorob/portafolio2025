import './Home.scss';
import { Link } from 'react-router-dom';
import { type SkillKey } from '../../components/Skills/Skills';
import { useQuery } from '@tanstack/react-query';
import { lazy, useRef } from 'react';
import { useOnView } from '../../hooks/useOnView';
import { SkeletonCardProject } from '../../components/Cards/CardProject/SkeletonCardProject';
const CardBlog = lazy(() =>
  import("../../components/Cards/CardBlog/CardBlog").then(module => ({ 
    default: module.CardBlog 
  }))
);
const CardExp = lazy(() =>
  import("../../components/Cards/CardExp/CardExp").then(module => ({ 
    default: module.CardExp 
  }))
);
const CardProject = lazy(() =>
  import("../../components/Cards/CardProject/CardProject").then(module => ({ 
    default: module.CardProject 
  }))
);
const Skills = lazy(() => 
  import("../../components/Skills/Skills").then( module =>({
    default: module.Skills
  }))
)
const SkeletonCardExp = lazy(() => 
  import("../../components/Cards/CardExp/SkeletonCardExp").then( module =>({
    default: module.SkeletonCardExp
  }))
)
const SkeletonBlog = lazy(() => 
  import("../../components/Cards/CardBlog/SkeletonBlog").then( module =>({
    default: module.SkeletonBlog
  }))
)


export const Home = () => {

  const sectionExperiences = useRef<HTMLDivElement | null>(null);
  const sectionProjects = useRef<HTMLDivElement | null>(null);
  const sectionBlogs = useRef<HTMLDivElement | null>(null);

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

  const { data: experiences, isLoading: isLoadingExperiences, refetch: refectExperiences } = useQuery({
      queryKey: ["experiences"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("http://localhost:3000/experiences");
        if (!res.ok) throw new Error("Error al cargar experiencias");
        return res.json();
      },
      enabled: false
  });

  const { data: projects, isLoading: isLoadingProjects, refetch: refectProjects } = useQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("http://localhost:3000/projects");
        if (!res.ok) throw new Error("Error al cargar experiencias");
        return res.json();
      },
      enabled: false
  });

  const { data: blogs, isLoading: isLoadingBlogs, refetch: refectBlogs } = useQuery({
      queryKey: ["blogs"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("http://localhost:3000/blogs");
        if (!res.ok) throw new Error("Error al cargar blogs");
        return res.json();
      },
      enabled: false
  });

  
  useOnView(sectionExperiences, refectExperiences);
  useOnView(sectionBlogs, refectBlogs);
  useOnView(sectionProjects, refectProjects);



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
        <img className="img-me" src="/me.png" alt="imagen desarrollador" width={400} height={400} loading='lazy' />
        <div className='info-desc-two'>
          <p>Apasionado por el mundo IT, con más de <span className='txt-blue'>4 años de experiencia</span> laboral entre <span className='txt-green'>ingeniero y desarrollador.</span></p>
        </div>
      </div>
      <div className="section">
        <h3>HABILIDADES <span className='txt-green'>FRONTEND</span> - <span className='txt-blue'>BACKEND</span> </h3>
        <Skills skills={skills}/>
      </div>
      <div className="section" ref={sectionExperiences}>
        <h3 className='txt-green'>EXPERIENCIA LABORAL</h3>
        <div className="container-experience">
          {
            (isLoadingExperiences) 
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCardExp key={`skeleton_card_experience_${i}`} />
                ))
              : (experiences ?? []).map((experience) => (
                  <CardExp key={`card_experience_${experience.id}`} experience={experience} />
                ))
          }
        </div>
      </div>
      <div className="section" ref={sectionProjects}>
        <h3 className='txt-blue'>PROYECTOS</h3>
        <div className="container-projects">
          {
            (isLoadingProjects)
              ? Array.from({ length: 4 }).map( (_,i) => (
                  <SkeletonCardProject key={`skeleton_card_project_${i}`} index={i} />
                ))
              : (projects ?? []).map( (project, index) => {
              return <CardProject key={`card_project_${project.id}`} project={project} index={index}/>
            })
          }
        </div>
        <div className='btn-more'>
          <Link to="/proyectos">Ver más</Link>
        </div>
      </div>

      <div className="section" ref={sectionBlogs}>
        <h3>Blogs</h3>
          <div className="container-blogs">
            {
              (isLoadingBlogs)
                ? Array.from({ length: 3}).map( (_,i) => (
                    <SkeletonBlog key={`skeleton_card_blog_${i}`} index={i} />
                  ))
                : (blogs ?? []).map( (blog, index) => {
                    return <CardBlog key={`card_blog_${blog.id}`} blog={blog} index={index}/>
                  })
            }
          </div>
          <div className='btn-more'>
            <Link to="/blogs">Ver más</Link>
          </div>
      </div>
    </div>
  )
}
