// Extract just the JavaScript from index.html to check for syntax errors
const fs = require('fs');
const html = fs.readFileSync('client/public/index.html', 'utf8');

// Extract the script content
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    const jsCode = scriptMatch[1];
    try {
        // Try to parse the JavaScript
        new Function(jsCode);
        console.log('✓ JavaScript syntax is valid');
    } catch (e) {
        console.error('✗ JavaScript syntax error:', e.message);
        console.error('Line:', e.stack);
    }
} else {
    console.error('✗ No script tag found');
}