/**
 * 乐谱相关
 */

import yaml from 'js-yaml';
import fs from 'fs';
import { Author, Score } from './types/config';

async function loadYAML<T extends object>(path: string): Promise<T | null> {
  const content = await fs.promises.readFile(path, {
    encoding: 'utf-8'
  });
  const data = yaml.load(content);
  if (data !== null && typeof data === 'object') {
    return data as T;
  } else {
    return null;
  }
}

export async function getScoresInfo() {
  return await loadYAML<Score[]>('scores/scores.yml');
}

export async function getAuthorsInfo() {
  return await loadYAML<Author[]>('scores/authors.yml');
}
