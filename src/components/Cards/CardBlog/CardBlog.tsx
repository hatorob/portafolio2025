import { Link } from 'react-router-dom';
import './CardBlog.scss';

type Props = {
    blog: Blog;
    index: number;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    coverImageKey: string;
}

export const CardBlog = ( { blog, index }: Props ) => {
    
    const { title, slug, shortDescription, coverImageKey } = blog;

    return (
        <div className={`card-blog_${index}`}>
            <img src={`${coverImageKey}`} alt="imagen blog" width={300} height={300} loading='lazy' />
            <div className='card_blog_info'>
                <h4 className='txt-green'>{title}</h4>
                <p>{shortDescription}</p>
                <div className='btn-read'>
                    <Link to={`/blogs/${slug}`}>Leer más</Link>
                </div>
            </div>
        </div>
    )
}
