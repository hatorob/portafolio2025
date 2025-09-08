import "./CardBlog.scss";

type Props = {
    index: number;
}

export const SkeletonBlog = ({ index }: Props) => {
  return (
    <div className={`skeleton-card-blog skeleton-card-blog_${index}`}>
      <div className="skeleton-img"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-btn"></div>
      </div>
    </div>
  )
}
