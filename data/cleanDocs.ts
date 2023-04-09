import fs from 'fs'
import path from 'path'
import { title } from 'process'
import {encode} from 'gpt-3-encoder' 
import { Doc } from '@/types'



function readMarkdownFiles(directory: string) {
  const files = fs.readdirSync(directory);
  const markdownObjects : Doc[] = [];
  const titleRegex = /^title: (.*)$/m

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively read Markdown files in subdirectory
      const subdirectoryMarkdownFiles = readMarkdownFiles(filePath);
      markdownObjects.push(...subdirectoryMarkdownFiles);
    } else if (path.extname(filePath) === '.md') {
        let content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(directory, filePath);
        const url = "https://react.dev/" + filePath.split("/").slice(2).join("/").slice(0,-3)        
        const titleMatch = content.match(titleRegex);
        let title : string = ""
        if (titleMatch) {
            title = titleMatch[1];
            content = content.replace(/^---\ntitle: (.*)\n---\n\n/gm, '').trim();
        }
        const length = content.trim().length
        const numTokens = encode(content.trim()).length
        const markdownObject : Doc = { 
            url,
            title,
            length,
            numTokens,
            content,
            chunks: []
        };
        markdownObjects.push(markdownObject)
    }
  });

  return markdownObjects;
}

// Example usage: read all Markdown files in 'my-directory'
const directory: string = '../react-docs/';
const markdownObjects: Doc[] = readMarkdownFiles(directory);
const docsJSON = JSON.stringify(markdownObjects)
fs.writeFileSync("data/react-docs.json", docsJSON)
