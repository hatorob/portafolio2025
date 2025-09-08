import "./CardProject.scss";


export const SkeletonCardProject = ({ index }: { index: number }) => {
  return (
    <div className={`card-project-skeleton ${index % 2 === 0 ? "left" : "right"}`}>
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton-desc">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton-skills">
          <div className="skeleton skeleton-skill"></div>
          <div className="skeleton skeleton-skill"></div>
          <div className="skeleton skeleton-skill"></div>
        </div>
      </div>
    </div>
  );
};
