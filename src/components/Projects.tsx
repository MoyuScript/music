import React, { ReactNode } from 'react';
import projectMeta from '../constants/projectMeta';
import Card from './Card';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tag from './Tag';
import fileExtColorMap from '../constants/fileExtColorMap';

const CheckItem: React.FC<{
    checked: boolean;
    children: React.ReactNode;
    count?: number;
    onClick: () => void;
}> = ({ checked, children, count = 0, onClick }) => {
    return (
        <li
            className={clsx(
                'relative flex items-center rounded-xl border-[1px] px-2 py-1 transition-colors cursor-pointer mb-4',
                checked && 'bg-sky-500 text-white'
            )}
        >
            {children}
            <span
                className={clsx(
                    'bg-[rgba(255,255,255,0.3)] text-xs rounded-full px-[0.25rem] py-[0.1rem] min-w-[1.5rem] ml-1 text-center',
                    !checked && 'bg-[rgba(0,0,0,0.05)]'
                )}
            >
                {count}
            </span>
            <input
                onChange={onClick}
                type="radio"
                checked={checked}
                className="absolute opacity-0 w-full h-full top-0 left-0"
            />
        </li>
    );
};

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
    const [currentAuthorId, setCurrentAuthorId] = React.useState<string | null>(
        null
    );
    return (
        <div className="">
            <ul className="flex space-x-2 flex-wrap">
                <CheckItem
                    count={projectMeta.projects.length}
                    checked={currentAuthorId === null}
                    onClick={() => setCurrentAuthorId(null)}
                >
                    全部
                </CheckItem>
                {projectMeta.authors.map((author) => (
                    <CheckItem
                        count={
                            projectMeta.projects.filter(
                                (project) => project.authorId === author.id
                            ).length
                        }
                        onClick={() => setCurrentAuthorId(author.id)}
                        key={author.name}
                        checked={currentAuthorId === author.id}
                    >
                        <img
                            alt="author avatar"
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
                        (project) =>
                            currentAuthorId === null ||
                            project.authorId === currentAuthorId
                    )
                    .sort(() => {
                        return Math.random() - 0.5;
                    })
                    .map((project) => {
                        const meta = project.meta;
                        const author = projectMeta.authors.find(
                            (author) => author.id === project.authorId
                        )!;

                        const exts = new Set(
                            project.files
                                .map((filePath) => {
                                    return filePath.split('.').pop()!;
                                })
                                .filter(Boolean)
                        );
                        const tags: ReactNode[] = [...exts.values()].map(
                            (ext) => {
                                return (
                                    <Tag
                                        key={ext}
                                        className={
                                            fileExtColorMap[ext] ||
                                            'bg-gray-400'
                                        }
                                    >
                                        {ext.toUpperCase()}
                                    </Tag>
                                );
                            }
                        );

                        return (
                            <li key={project.id}>
                                <Link
                                    to={`/projects/${author.id}/${project.id}`}
                                >
                                    <Card className="flex overflow-hidden group relative items-center flex-col sm:flex-row">
                                        <div className="relative w-full h-32 sm:h-24 sm:w-24 overflow-hidden bg-gray-200 flex justify-center items-center group-hover:bg-sky-400 transition-colors shrink-0">
                                            {meta.cover ? (
                                                <img
                                                    loading="lazy"
                                                    alt="cover"
                                                    src={meta.cover}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <i className="fa-solid fa-music text-gray-400 group-hover:text-white text-4xl transition-colors" />
                                            )}
                                        </div>
                                        <div className="sm:ml-4 p-4 sm:p-0 w-full sm:w-auto grow">
                                            <h2 className="font-bold sm:text-lg flex pr-4 justify-between items-center">
                                                <span>
                                                    <span>
                                                        {meta.name ||
                                                            project.id}
                                                    </span>
                                                </span>
                                                <span className="hidden sm:block space-x-1 ml-2">
                                                    {tags}
                                                </span>
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
                                            <p className="space-x-1 mt-2 text-right sm:hidden">
                                                {tags}
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
