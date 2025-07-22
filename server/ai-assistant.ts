import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';

// The newest Anthropic model is "claude-sonnet-4-20250514", not "claude-3-7-sonnet-20250219", "claude-3-5-sonnet-20241022" nor "claude-3-sonnet-20240229". 
// If the user doesn't specify a model, always prefer using "claude-sonnet-4-20250514" as it is the latest model.
const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface CodeChange {
  description: string;
  approach: string;
  changes: Array<{
    file: string;
    reason: string;
    oldCode: string;
    newCode: string;
  }>;
}

export class AICodeAssistant {
  
  async analyzeSharedComponents(changeDescription: string): Promise<CodeChange> {
    const frenchFiles = await this.getFileContents([
      'client/public/index.html',
      'client/public/emplois.html',
      'client/public/communiques.html',
      'client/public/nous-joindre.html'
    ]);
    
    const englishFiles = await this.getFileContents([
      'client/public/index-en.html',
      'client/public/emplois-en.html',
      'client/public/communiques-en.html',
      'client/public/nous-joindre-en.html'
    ]);
    
    const sharedCSS = await this.getFileContents(['client/public/css/shared.css']);
    
    const prompt = `
You are a code assistant for a bilingual website (French/English). The user wants to make this change: "${changeDescription}"

Here are the current files:

FRENCH FILES:
${frenchFiles.map(f => `=== ${f.path} ===\n${f.content}`).join('\n\n')}

ENGLISH FILES:
${englishFiles.map(f => `=== ${f.path} ===\n${f.content}`).join('\n\n')}

SHARED CSS:
${sharedCSS.map(f => `=== ${f.path} ===\n${f.content}`).join('\n\n')}

Please analyze the requested change and suggest modifications that will:
1. Apply to both French and English versions consistently
2. Minimize duplicate code changes
3. Maintain the existing bilingual structure
4. Focus on shared CSS classes or shared JavaScript when possible

Respond with a JSON object containing:
{
  "description": "Clear description of what will be changed",
  "approach": "Explanation of the approach (shared CSS, shared JS, or individual file changes)",
  "changes": [
    {
      "file": "path/to/file",
      "reason": "Why this file needs to be changed",
      "oldCode": "exact code to replace",
      "newCode": "new code to insert"
    }
  ]
}
`;

    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return JSON.parse(content.text);
    }
    throw new Error('Unexpected response format from AI');
  }

  async applyGridChange(changeDescription: string): Promise<{success: boolean; message: string; changes: any}> {
    try {
      const analysis = await this.analyzeSharedComponents(changeDescription);
      
      // Apply the suggested changes
      const appliedChanges = [];
      for (const change of analysis.changes) {
        try {
          const currentContent = await fs.readFile(change.file, 'utf-8');
          const newContent = currentContent.replace(change.oldCode, change.newCode);
          
          if (newContent !== currentContent) {
            await fs.writeFile(change.file, newContent, 'utf-8');
            appliedChanges.push({
              file: change.file,
              reason: change.reason,
              applied: true
            });
          } else {
            appliedChanges.push({
              file: change.file,
              reason: change.reason,
              applied: false,
              error: 'Old code not found - manual review needed'
            });
          }
        } catch (error) {
          appliedChanges.push({
            file: change.file,
            reason: change.reason,
            applied: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return {
        success: true,
        message: `Applied changes: ${analysis.description}`,
        changes: appliedChanges
      };
      
    } catch (error) {
      return {
        success: false,
        message: `Error applying changes: ${error instanceof Error ? error.message : 'Unknown error'}`,
        changes: []
      };
    }
  }

  private async getFileContents(filePaths: string[]): Promise<Array<{path: string; content: string}>> {
    const results = [];
    
    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        results.push({ path: filePath, content });
      } catch (error) {
        // File doesn't exist or can't be read - skip it
        console.warn(`Could not read file: ${filePath}`);
      }
    }
    
    return results;
  }

  async suggestCodeImprovement(code: string, context: string): Promise<string> {
    const prompt = `
As a code assistant for a bilingual Tonic Productions website, please review this code and suggest improvements:

CONTEXT: ${context}

CODE:
${code}

Please suggest improvements for:
- Performance optimization
- Code maintainability  
- Bilingual considerations
- Modern web practices
- Accessibility

Respond with specific, actionable suggestions.
`;

    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    throw new Error('Unexpected response format from AI');
  }
}