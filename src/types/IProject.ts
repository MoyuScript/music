import IProjectMeta from "./IProjectMeta";

interface IProject {
    id: string
    authorId: string
    meta: IProjectMeta
    readme?: string
    files: string[]
    ctime: number
}

export default IProject;
