import { PluginOption } from 'vite';
import { globby } from 'globby';
import path from 'path';
import IAuthor from '../src/types/IAuthor';
import IProject from '../src/types/IProject';
import fs from 'fs';

const virtualModuleId = 'virtual:project-meta';

export default function vitePluginProjectMeta(): PluginOption {
    let publicDir: string = '';
    let base: string = '';
    return {
        name: 'vite-plugin-project-meta',
        configResolved(config) {
            publicDir = config.publicDir.replace(/\\/g, '/');
            base = config.base;
        },
        resolveId(id) {
            if (id === virtualModuleId) {
                return virtualModuleId;
            }
        },
        async load(id) {
            if (id === virtualModuleId) {
                const p = path.posix.join(publicDir, 'projects');
                const projectFiles = (await globby(p)).map((p) =>
                    p.replace(`${publicDir}/projects/`, '')
                );

                const authors: IAuthor[] = [];
                const projects: IProject[] = [];

                const metaFiles = projectFiles.filter((path) =>
                    path.toLowerCase().endsWith('meta.json')
                );

                metaFiles.forEach((path) => {
                    const authorId = path.split('/')[0];
                    const id = path.split('/')[1];

                    if (id.toLowerCase() === 'meta.json') {
                        const data = fs.readFileSync(
                            `${publicDir}/projects/${path}`,
                            'utf8'
                        );
                        authors.push(JSON.parse(data));
                        return;
                    }

                    const fileName = path.split('/')[2];

                    if (fileName.toLowerCase() === 'meta.json') {
                        const metaPath = `${publicDir}/projects/${path}`;
                        const stat = fs.statSync(metaPath);
                        const data = fs.readFileSync(
                            metaPath,
                            'utf8'
                        );
                        const readmePath = `${publicDir}/projects/${authorId}/${id}/readme.md`;
                        const files = projectFiles
                            .filter(
                                (p) =>
                                    p.startsWith(`${authorId}/${id}/`) &&
                                    !p.toLowerCase().endsWith('meta.json') &&
                                    !p.toLowerCase().endsWith('readme.md')
                            )
                            .map((p) => `${base}projects/${p}`);
                        projects.push({
                            authorId,
                            files,
                            readme: fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '',
                            id,
                            meta: JSON.parse(data),
                            ctime: Math.round(stat.ctimeMs)
                        });

                        return;
                    }
                });

                const meta = {
                    authors,
                    projects,
                };

                return `export default ${JSON.stringify(meta)}`;
            }
        },
    };
}
