import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDir = path.join(process.cwd(), 'public', 'projects');

export interface AuthorMeta {
  id: string;
  name: string;
  avatar: string;
  url: string;
  bio: string;
  afdianId: string;
}

export interface ProjectMeta {
  name: string;
  cover?: string;
  bvid?: string;
  [key: string]: any;
}

export interface Project {
  author: string;
  slug: string;
  meta: ProjectMeta;
  content: string;
  files: string[];
}

export interface Author {
  slug: string;
  meta: AuthorMeta;
  projects: Array<{
    slug: string;
    meta: ProjectMeta;
  }>;
}

/**
 * Get all authors with their projects
 */
export function getAuthors(): Author[] {
  const authorDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const authors: Author[] = [];

  for (const authorSlug of authorDirs) {
    const authorPath = path.join(projectsDir, authorSlug);
    const readmePath = path.join(authorPath, 'readme.md');

    if (!fs.existsSync(readmePath)) continue;

    const fileContents = fs.readFileSync(readmePath, 'utf8');
    const { data } = matter(fileContents);

    // Get projects for this author
    const projectDirs = fs.readdirSync(authorPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const projects = [];
    for (const projectSlug of projectDirs) {
      const projectReadmePath = path.join(authorPath, projectSlug, 'readme.md');
      if (fs.existsSync(projectReadmePath)) {
        const projectContents = fs.readFileSync(projectReadmePath, 'utf8');
        const { data: projectData } = matter(projectContents);
        projects.push({
          slug: projectSlug,
          meta: projectData as ProjectMeta,
        });
      }
    }

    authors.push({
      slug: authorSlug,
      meta: data as AuthorMeta,
      projects,
    });
  }

  return authors;
}

/**
 * Get a specific author
 */
export function getAuthor(authorSlug: string): Author | null {
  const authors = getAuthors();
  return authors.find(a => a.slug === authorSlug) || null;
}

/**
 * Get a specific project
 */
export function getProject(authorSlug: string, projectSlug: string): Project | null {
  const projectPath = path.join(projectsDir, authorSlug, projectSlug);
  const readmePath = path.join(projectPath, 'readme.md');

  if (!fs.existsSync(readmePath)) return null;

  const fileContents = fs.readFileSync(readmePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Get all files in the project directory
  const files = fs.readdirSync(projectPath)
    .filter(file => file !== 'readme.md');

  return {
    author: authorSlug,
    slug: projectSlug,
    meta: data as ProjectMeta,
    content,
    files,
  };
}

/**
 * Get all project paths for static generation
 */
export function getAllProjectPaths(): Array<{ author: string; project: string }> {
  const authors = getAuthors();
  const paths: Array<{ author: string; project: string }> = [];

  for (const author of authors) {
    for (const project of author.projects) {
      paths.push({
        author: author.slug,
        project: project.slug,
      });
    }
  }

  return paths;
}
