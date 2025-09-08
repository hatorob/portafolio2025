import "./CardExp.scss";

export const SkeletonCardExp = () => {
  return (
    <div className="container-cardExp skeleton">
      <div className="header">
        <span className="skeleton-box skeleton-title"></span>
        <span className="skeleton-box skeleton-date"></span>
      </div>
      <p className="skeleton-box skeleton-text"></p>
      <p className="skeleton-box skeleton-text short"></p>
      <p className="skeleton-box skeleton-text tiny"></p>

      <p className="skeleton-box skeleton-subtitle"></p>
      <ul>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="skeleton-box skeleton-list"></li>
        ))}
      </ul>

      <p className="skeleton-box skeleton-subtitle"></p>
      <ul className="container-card-skills">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="skeleton-box skeleton-skill"></li>
        ))}
      </ul>
    </div>
  )
}
