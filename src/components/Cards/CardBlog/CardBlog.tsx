import { Link } from 'react-router-dom';
import './CardBlog.scss';

type Props = {
    blog: Blog;
    index: number;
}

interface Blog {
    id: number;
    titule: string;
    slug: string;
    desc_short: string;
    img: string;
}

export const CardBlog = ( { blog, index }: Props ) => {
    
    const { titule, slug, desc_short, img } = blog;

    return (
        <div className={`card-blog_${index}`}>
            <img src={`${img}`} alt="imagen blog" width={300} height={300} loading='lazy' />
            <div className='card_blog_info'>
                <h4 className='txt-green'>{titule}</h4>
                <p>{desc_short}</p>
                <div className='btn-read'>
                    <Link to={`/blogs/${slug}`}>Leer más</Link>
                </div>
            </div>
        </div>
    )
}
