import React from 'react';
import projectMeta from '../constants/projectMeta';
import Card from './Card';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import clsx from 'clsx';

const CheckItem: React.FC<{
    checked: boolean;
    children: React.ReactNode;
    onClick: () => void;
}> = ({ checked, children, onClick }) => {
    return (
        <li
            onClick={onClick}
            className={clsx(
                'flex items-center rounded-xl border-[1px] px-2 py-1 transition-colors cursor-pointer mb-4',
                checked && 'bg-sky-500 text-white'
            )}
        >
            {children}
        </li>
    );
};

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
    const [currentAuthorId, setCurrentAuthorId] = React.useState<string | null>(
        null
    );
    return (
        <div className=''>
            <ul className="flex space-x-2 flex-wrap">
                <CheckItem checked={currentAuthorId === null} onClick={() => setCurrentAuthorId(null)}>全部</CheckItem>
                {projectMeta.authors.map((author) => (
                    <CheckItem
                        onClick={() => setCurrentAuthorId(author.id)}
                        key={author.name}
                        checked={currentAuthorId === author.id}
                    >
                        <img
                            alt='author avatar'
                            src={author.avatar}
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="ml-2 text-sm">{author.name}</span>
                    </CheckItem>
                ))}
            </ul>
            <ul className="space-y-4 mt-6">
                {projectMeta.projects
                    .filter(
                        (project) => currentAuthorId === null || project.authorId === currentAuthorId
                    )
                    .sort(
                        (a, b) =>
                            dayjs(b.meta.ctime).unix() -
                            dayjs(a.meta.ctime).unix()
                    )
                    .map((project) => {
                        const meta = project.meta;
                        const author = projectMeta.authors.find(
                            (author) => author.id === project.authorId
                        );
                        const isNew = dayjs().diff(
                            dayjs(meta.ctime),
                            'day'
                        ) <= 7;
                        return (
                            <li key={project.id}>
                                <Link to={`/projects/${project.id}`}>
                                    <Card className="flex overflow-hidden group relative items-center flex-col sm:flex-row">
                                        <div className="relative w-full h-32 sm:h-24 sm:w-24 overflow-hidden bg-gray-200 flex justify-center items-center group-hover:bg-sky-400 transition-colors">
                                            {meta.cover ? (
                                                <img
                                                    alt="cover"
                                                    src={meta.cover}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <i className="fa-solid fa-music text-gray-400 group-hover:text-white text-4xl transition-colors" />
                                            )}
                                        </div>
                                        <div className="ml-4 py-2 sm:py-0">
                                            <h2 className="font-bold sm:text-lg flex items-center">
                                                <span>
                                                    {meta.name}
                                                </span>
                                                {
                                                    isNew && (
                                                        <span className=' text-white bg-green-500 text-xs p-1 rounded-full ml-2'>
                                                            NEW
                                                        </span>
                                                    )
                                                }
                                            </h2>
                                            <p className="text-xs mt-2 text-gray-400 flex items-center">
                                                <img
                                                    alt="author avatar"
                                                    className="w-6 h-6 rounded-full object-cover inline-block"
                                                    src={author?.avatar}
                                                />
                                                <span className="ml-1">
                                                    {author?.name}
                                                </span>
                                            </p>
                                        </div>
                                        
                                    </Card>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Projects;
