import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Project } from '~/types';
import { cleanSlug } from './permalinks';

const getNormalizedProject = async (project: CollectionEntry<'project'>): Promise<Project> => {
  const { id, data } = project;
  const { Content } = await render(project);

  const { title, description, image, status, date, link, draft = false } = data;

  return {
    id,
    slug: cleanSlug(id),
    title,
    description,
    image,
    status,
    date,
    link,
    draft,
    Content,
  };
};

let _projects: Array<Project>;

const load = async (): Promise<Array<Project>> => {
  const projects = await getCollection('project');
  const normalizedProjects = projects.map((project) => getNormalizedProject(project));

  return (await Promise.all(normalizedProjects))
    .filter((project) => !project.draft)
    .sort((a, b) => (b.date?.valueOf() ?? 0) - (a.date?.valueOf() ?? 0));
};

export const fetchProjects = async (): Promise<Array<Project>> => {
  if (!_projects) {
    _projects = await load();
  }

  return _projects;
};

export const findProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const projects = await fetchProjects();
  return projects.find((project) => project.slug === slug);
};

export const findLatestProjects = async ({ count }: { count?: number }): Promise<Array<Project>> => {
  const _count = count || 4;
  const projects = await fetchProjects();
  return projects.slice(0, _count);
};
