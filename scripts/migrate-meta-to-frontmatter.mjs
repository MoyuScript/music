import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, '..', 'public', 'projects');

/**
 * Convert JSON object to YAML front matter string
 */
function jsonToYamlFrontMatter(json) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(json)) {
    if (typeof value === 'string') {
      // Escape quotes and handle multiline strings
      if (value.includes('\n') || value.includes('"') || value.includes(':')) {
        lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
      } else {
        lines.push(`${key}: "${value}"`);
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else if (value === null) {
      lines.push(`${key}: null`);
    } else {
      // For objects/arrays, use JSON representation
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

/**
 * Process a single directory (recursive)
 */
async function processDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  
  // Check if this directory has meta.json and readme.md
  const hasMetaJson = entries.some(e => e.isFile() && e.name === 'meta.json');
  const readmeEntry = entries.find(e => e.isFile() && e.name.toLowerCase() === 'readme.md');
  
  if (hasMetaJson) {
    const metaPath = path.join(dirPath, 'meta.json');
    // Use the actual readme filename if it exists (preserving case), otherwise use 'readme.md'
    const readmePath = path.join(dirPath, readmeEntry ? readmeEntry.name : 'readme.md');
    
    try {
      // Read meta.json
      const metaContent = await fs.readFile(metaPath, 'utf-8');
      const metaData = JSON.parse(metaContent);
      
      if (readmeEntry) {
        // Readme exists - read and update it
        const readmeContent = await fs.readFile(readmePath, 'utf-8');
        
        // Check if readme already has front matter
        if (readmeContent.startsWith('---')) {
          console.log(`⚠️  Skipping ${path.relative(projectsDir, dirPath)} - readme.md already has front matter`);
        } else {
          // Create new readme with front matter
          const frontMatter = jsonToYamlFrontMatter(metaData);
          const newReadme = `${frontMatter}\n\n${readmeContent}`;
          
          // Write new readme
          await fs.writeFile(readmePath, newReadme, 'utf-8');
          console.log(`✅ Migrated ${path.relative(projectsDir, dirPath)}`);
        }
      } else {
        // Readme doesn't exist - create it with just the front matter
        const frontMatter = jsonToYamlFrontMatter(metaData);
        await fs.writeFile(readmePath, `${frontMatter}\n`, 'utf-8');
        console.log(`📝 Created ${path.relative(projectsDir, readmePath)}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${dirPath}:`, error.message);
    }
  }
  
  // Process subdirectories
  for (const entry of entries) {
    if (entry.isDirectory()) {
      await processDirectory(path.join(dirPath, entry.name));
    }
  }
}

/**
 * Delete all meta.json files (optional, run separately)
 */
async function deleteMetaJsonFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isFile() && entry.name === 'meta.json') {
      await fs.unlink(fullPath);
      console.log(`🗑️  Deleted ${path.relative(projectsDir, fullPath)}`);
    } else if (entry.isDirectory()) {
      await deleteMetaJsonFiles(fullPath);
    }
  }
}

// Main execution
const args = process.argv.slice(2);
const shouldDelete = args.includes('--delete');

console.log('🚀 Starting migration...\n');

try {
  await processDirectory(projectsDir);
  
  if (shouldDelete) {
    console.log('\n🗑️  Deleting meta.json files...\n');
    await deleteMetaJsonFiles(projectsDir);
  } else {
    console.log('\n✨ Migration complete!');
    console.log('ℹ️  Run with --delete flag to remove meta.json files');
  }
} catch (error) {
  console.error('❌ Fatal error:', error);
  process.exit(1);
}
