import React from 'react';
import projectMeta from '../constants/projectMeta';
import AuthorCard from './AuthorCard';

export interface AuthorsProps {}

const Authors: React.FC<AuthorsProps> = () => {
    return (
        <ul className='flex flex-wrap justify-center sm:space-x-4'>
            {
                projectMeta.authors.map((author) => (
                    <li key={author.name} className='relative mb-4 w-full sm:w-auto'>
                        <AuthorCard author={author} />
                    </li>
                ))
            }
        </ul>
    );
}

export default Authors;
