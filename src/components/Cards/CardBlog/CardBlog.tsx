import { Link } from 'react-router-dom';
import './CardBlog.scss';
import { useStorageUrl } from '../../../hooks/storage/useStorageUrl';

type Props = {
    blog: Blog;
    index: number;
    isHome: boolean;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    coverImageKey: string;
}

export const CardBlog = ( { blog, index, isHome }: Props ) => {
    
    const { title, slug, shortDescription, coverImageKey } = blog;
    const imageUrl = useStorageUrl(coverImageKey);

    return (
        <div className={(isHome) ? `card-blog_${index}` : "card-blog"}>
            <img src={`${imageUrl}`} alt="imagen blog" width={300} height={300} loading='lazy' />
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
