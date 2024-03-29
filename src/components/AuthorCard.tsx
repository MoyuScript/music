import React from 'react';
import IAuthor from '../types/IAuthor';
import Card, { CardProps } from './Card';

export interface AuthorCardProps extends CardProps {
    author: IAuthor
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, ...props }) => {
    return (
        <Card {...props}>
            <a
                target='_blank'
                href={author.url}
                className='flex items-center p-4 sm:p-6 w-full'>
                <span className='shrink-0'>
                    <img
                        alt='author avatar'
                        src={author.avatar} className='w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full' />
                </span>
                <span className='bg-gray-100 w-[0.05rem] h-20 mx-2 sm:mx-6 dark:bg-gray-600' />
                <span>
                    <h2 className='sm:text-xl font-bold'>{author.name}</h2>
                    <p className='italic text-secondary mt-2 text-xs sm:text-sm'>
                        {author.bio}
                    </p>
                </span>
            </a>
        </Card>
    );
}

export default AuthorCard;
