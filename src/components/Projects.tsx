import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import fileExtColorMap from '../constants/fileExtColorMap';
import projectMeta from '../constants/projectMeta';
import IAuthor from '../types/IAuthor';
import Card from './Card';
import Tag from './Tag';

const CheckItem: React.FC<{
    author: IAuthor | null;
    currentAuthorId: string | null;
    children: React.ReactNode;
    count?: number;
}> = ({ children, count = 0, author, currentAuthorId }) => {
    const checked =
        (author === null && currentAuthorId === null) ||
        (author !== null && currentAuthorId === author.id);
    return (
        <li
            className={clsx(
                'relative  rounded-xl border-[1px] px-2 py-1 transition-colors cursor-pointer mb-4 dark:border-gray-700',
                checked ? 'bg-sky-500 text-white' : 'bg-white dark:bg-gray-800'
            )}
        >
            <Link
                replace
                className="flex items-center"
                to={author === null ? '/' : `/projects/${author.id}`}
            >
                {children}
                <span
                    className={clsx(
                        'text-xs rounded-full px-[0.25rem] py-[0.1rem] min-w-[1.5rem] ml-1 text-center',
                        checked
                            ? 'bg-[rgba(255,255,255,0.3)]'
                            : 'bg-[rgba(0,0,0,0.07)]'
                    )}
                >
                    {count}
                </span>
            </Link>
        </li>
    );
};

export interface ProjectsProps {
    currentAuthorId: string | null;
}

const Projects: React.FC<ProjectsProps> = ({ currentAuthorId }) => {
    const [keyword, setKeyword] = useState<string | undefined>(undefined);
    const projects = projectMeta.projects
        .filter((project) => {
            const authorFilter =
                currentAuthorId === null ||
                project.authorId === currentAuthorId;

            const textToSearch = [
                `${project.id}`,
                `${project.meta.name || ''}`,
                `${project.readme || ''}`,
                ...project.files,
            ].join('\n');
            const keywordFilter =
                keyword === undefined ||
                textToSearch.toLowerCase().includes(keyword.toLowerCase());
            return authorFilter && keywordFilter;
        })
        .sort((a, b) => b.ctime - a.ctime);
    return (
        <div className="">
            <ul className="flex space-x-2 flex-wrap">
                <CheckItem
                    author={null}
                    count={projectMeta.projects.length}
                    currentAuthorId={currentAuthorId || null}
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
                        key={author.name}
                        author={author}
                        currentAuthorId={currentAuthorId || null}
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
            <div className="mt-2">
                <input
                    type="search"
                    placeholder="搜索项目..."
                    className="block w-full outline-none border-[1px] rounded-md px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <ul className="space-y-4 mt-6">
                {projects.length === 0 && (
                    <li className="text-center">啥也木有...</li>
                )}
                {projects.map((project) => {
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
                    const tags: ReactNode[] = [...exts.values()].map((ext) => {
                        return (
                            <Tag
                                key={ext}
                                className={
                                    fileExtColorMap[ext] || 'bg-gray-400'
                                }
                            >
                                {ext.toUpperCase()}
                            </Tag>
                        );
                    });

                    if (meta.bvid) {
                        tags.push(
                            <Tag
                                key="bvid"
                                className="bg-teal-500">
                                <i className="fa-solid fa-video" />
                            </Tag>
                        );
                    }

                    return (
                        <li key={project.id}>
                            <Link to={`/projects/${author.id}/${project.id}`}>
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
                                                    {meta.name || project.id}
                                                </span>
                                            </span>
                                            <span className="hidden sm:block space-x-1 ml-2">
                                                {tags}
                                            </span>
                                        </h2>
                                        <p className="text-xs mt-2 text-secondary flex items-center">
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
