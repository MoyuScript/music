import projectMeta from 'virtual:project-meta'
import IProject from '../types/IProject';
import IAuthor from '../types/IAuthor';

export default projectMeta as {
    authors: IAuthor[],
    projects: IProject[],
};
