import { useLocation } from "react-router-dom"
import { useBlogs } from "../../hooks/blogs/useBlogs";
import { useStorageUrl } from "../../hooks/storage/useStorageUrl";
import { Skills } from "../../components/Skills/Skills";
import './Blog.scss';


export const Blog = () => {

  const location = useLocation();
  const lastSegment = location.pathname.split("/").filter(Boolean).pop();

  const { data, isLoading, error } = useBlogs({
    filter: {
      slug: { eq: lastSegment }
    },
  });

  const urlImage = useStorageUrl((data) && data[0]?.coverImageKey || "");

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar el blog</p>;
  }

  if (!data || data.length === 0) {
    return <p>No se encontró el blog</p>;
  }

  const blog = data[0];
    
  const formattedDate = new Date(blog?.publishedAt).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="container-blog"
    >
      <div
        className="blog-header"
      >
      <div>
        <h1>{blog.title}</h1>
        <div 
          style={{
            display: "flex",
            flexDirection: "column"
          }}>
          <div>
            <h4>Publicado el {formattedDate}</h4>
          </div>
          <div>
            <h4>Tecnologías relacionadas</h4>
            <Skills skills={blog.skills}/>
          </div>
        </div>
      </div>
      <div 
        style={{
          width: "100%",
          backgroundImage: `url(${urlImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          borderRadius: "3rem"
        }}      
      />
      </div>
      <div className="description">
        <p style={{
          lineHeight: "1.7"
        }}>
          {blog.content}
        </p>
      </div>
    </div>
  )
}
