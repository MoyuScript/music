interface IProject {
    id: string
    authorId: string
    meta: {
        name: string
        cover: string
        ctime: string
    },
    readme?: string
    files: string[]
}

export default IProject;
