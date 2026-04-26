import { useState } from "react";
import { CardBlog } from "../../components/Cards/CardBlog/CardBlog";
import { SkeletonBlog } from "../../components/Cards/CardBlog/SkeletonBlog";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import './Blog.scss';

export const Blogs = () => {

  const [search, setSearch] = useState("");
  const [skill, setSkill ] = useState("");

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

  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs({
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
      <h1>Blogs</h1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "3rem 0",
        gap: "3rem",
      }}>
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
      </div>
        <div className="blogs-grid">
          {
            (isLoadingBlogs)
              ? Array.from({ length: 3}).map( (_,i) => (
                  <SkeletonBlog key={`skeleton_card_blog_${i}`} index={i} />
                ))
              : (blogs ?? []).map( (blog, index) => {
                  return <CardBlog key={`card_blog_${blog.id}`} blog={blog} index={index} isHome={false}/>
                })
          }
        </div>
    </div>
  )
}
