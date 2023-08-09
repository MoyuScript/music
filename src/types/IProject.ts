import IProjectMeta from "./IProjectMeta";

interface IProject {
    id: string
    authorId: string
    meta: IProjectMeta,
    readme?: string
    files: string[]
}

export default IProject;
