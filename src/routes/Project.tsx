import React from 'react';
import { useParams } from 'react-router-dom';
import projectMeta from '../constants/projectMeta';
import NotFound from './NotFound';
import Section from '../components/Section';
import AuthorCard from '../components/AuthorCard';
import { useTitle } from 'ahooks';
import Card from '../components/Card';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import useHtmlBackgroundImage from '../hooks/useHtmlBackgroundImage';
import fileExtColorMap from '../constants/fileExtColorMap';
import { isMobile } from '../constants/env';

export interface ProjectProps {}

const Project: React.FC<ProjectProps> = () => {
    const params = useParams();
    const { id, authorId } = params;
    const project = projectMeta.projects.find(
        (project) => project.id === id && project.authorId === authorId
    );
    const name = project?.meta?.name || project?.id;
    useTitle(
        project
            ? `${name} - ${__APP_NAME__}`
            : `404 - Not Found - ${__APP_NAME__}`
    );

    useHtmlBackgroundImage(project?.meta?.cover);

    if (!project) return <NotFound />;

    const author = projectMeta.authors.find(
        (author) => author.id === project.authorId
    );
    const meta = project.meta;
    return (
        <div>
            <h1 className="mt-4 text-center text-3xl font-bold">{name}</h1>
            <div className="mt-8">
                {author && (
                    <Section title="作者介绍">
                        <AuthorCard
                            author={author}
                            className="max-w-[30rem] mx-auto"
                        />
                    </Section>
                )}
                {project.readme && (
                    <Section title="说明文档">
                        <Card className="markdown-body overflow-hidden p-4">
                            <Markdown>{project.readme}</Markdown>
                        </Card>
                    </Section>
                )}
                {meta.bvid && (
                    <Section title="视频预览">
                        <Card className="relative max-w-[40rem] aspect-video flex mx-auto overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src={`//player.bilibili.com/player.html?bvid=${meta.bvid}`}
                            />
                        </Card>
                    </Section>
                )}
                <Section title="文件列表">
                    <ul className="space-y-4">
                        {project.files.map((filePath) => {
                            const baseName = filePath
                                .split('/')
                                .pop() as string;
                            const ext = baseName.split('.').pop();
                            return (
                                <li key={filePath}>
                                    <Card className="overflow-hidden">
                                        <a
                                            download={baseName}
                                            href={filePath}
                                            className="relative flex group items-center h-14 sm:h-20"
                                        >
                                            <span
                                                className={clsx(
                                                    'relative shrink-0 h-full w-20 sm:w-28 flex justify-center items-center text-white font-bold sm:text-2xl',
                                                    fileExtColorMap[
                                                        ext ?? '$default'
                                                    ] ??
                                                        fileExtColorMap[
                                                            '$default'
                                                        ]
                                                )}
                                            >
                                                {ext?.toUpperCase()}
                                            </span>
                                            <span className="ml-4 grow">
                                                {baseName}
                                            </span>
                                            <span className="h-full flex items-center justify-center px-4 bg-gray-200 group-hover:px-8 group-hover:text-2xl group-hover:text-white group-hover:bg-sky-400 transition-all">
                                                <i className="fa-solid fa-download" />
                                            </span>
                                        </a>
                                    </Card>
                                </li>
                            );
                        })}
                    </ul>
                </Section>
                {author?.afdianId && (
                    <Section title="⚡电我⚡">
                        <div className='flex justify-center'>
                            <iframe
                                src={`https://afdian.net/leaflet?slug=${author.afdianId}`}
                                scrolling='no'
                                frameBorder="0"
                                className={
                                    clsx(
                                        'w-full min700:w-[640px] h-[210px] p-0 shadow-xl rounded-xl',
                                        !isMobile() && 'translate-x-[6px]'
                                    )
                                }
                            ></iframe>
                        </div>
                    </Section>
                )}
            </div>
        </div>
    );
};

export default Project;
