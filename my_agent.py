from claude import ask
import os
import glob

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def read_file(filename):
    """Read a file and return its contents"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading {filename}: {e}"

def list_project_files():
    """List all code files in the project"""
    extensions = ['*.html', '*.css', '*.js', '*.py', '*.json', '*.md', '*.txt']
    files = []
    for ext in extensions:
        files.extend(glob.glob(ext))
    return sorted(files)

def get_project_context():
    """Get overview of all project files"""
    files = list_project_files()
    context = "📁 PROJECT FILES:\n"
    for file in files[:10]:  # Show first 10 files
        size = os.path.getsize(file) if os.path.exists(file) else 0
        context += f"  - {file} ({size} bytes)\n"
    return context

def smart_ask(question, include_files=None, auto_detect=True):
    """Enhanced ask that can include file contents"""
    
    full_prompt = question
    
    # Auto-detect if user mentions files
    if auto_detect:
        files = list_project_files()
        mentioned_files = []
        for file in files:
            if file.lower() in question.lower() or file.split('.')[0].lower() in question.lower():
                mentioned_files.append(file)
        
        if mentioned_files:
            full_prompt += f"\n\n📋 RELEVANT FILES:\n"
            for file in mentioned_files[:3]:  # Limit to 3 files to avoid token limits
                content = read_file(file)
                full_prompt += f"\n=== {file.upper()} ===\n{content}\n"
    
    # Include specific files if requested
    if include_files:
        full_prompt += f"\n\n📋 REQUESTED FILES:\n"
        for file in include_files:
            if os.path.exists(file):
                content = read_file(file)
                full_prompt += f"\n=== {file.upper()} ===\n{content}\n"
    
    # Add project context
    full_prompt += f"\n\n{get_project_context()}"
    
    return ask(full_prompt)

def agent_interface():
    clear_screen()
    print("🤖" + "="*60)
    print("      SMART CLAUDE AGENT - READS YOUR PROJECT!")
    print("        (Auto-detects files & reads them directly)")
    print("="*63)
    print("Commands: 'files' | 'read filename' | 'clear' | 'quit'")
    print("-"*63)
    
    conversation_count = 0
    
    while True:
        try:
            user_input = input(f"\n💬 You: ").strip()
            
            if user_input.lower() == 'quit':
                print("\n👋 Goodbye!")
                break
                
            elif user_input.lower() == 'clear':
                agent_interface()
                return
                
            elif user_input.lower() == 'files':
                files = list_project_files()
                print(f"\n📁 PROJECT FILES ({len(files)} found):")
                for i, file in enumerate(files, 1):
                    size = os.path.getsize(file) if os.path.exists(file) else 0
                    print(f"  {i}. {file} ({size} bytes)")
                continue
                
            elif user_input.lower().startswith('read '):
                filename = user_input[5:].strip()
                content = read_file(filename)
                print(f"\n📄 CONTENT OF {filename}:")
                print("-" * 40)
                print(content[:500] + ("..." if len(content) > 500 else ""))
                continue
                
            elif user_input.lower() == 'help':
                show_smart_help()
                continue
                
            elif user_input:
                conversation_count += 1
                print(f"\n🤖 Smart Claude Agent (Response #{conversation_count}):")
                print("🔍 Auto-detecting relevant files...")
                print("-" * 50)
                
                # Use smart ask that reads files automatically
                smart_ask(user_input)
                print("-" * 63)
        
        except KeyboardInterrupt:
            print("\n\n👋 Session interrupted. Goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")

def show_smart_help():
    print("""
📋 SMART CLAUDE AGENT HELP:

🔍 AUTO FILE DETECTION:
    "fix my menu bug" → Reads index.html, style.css, script.js automatically
    "debug my Python app" → Reads all .py files  
    "improve my CSS" → Reads all .css files

📁 FILE COMMANDS:
    "files" → List all project files
    "read filename.js" → Show specific file content

🐛 SMART DEBUGGING:
    "my button isn't working" → Finds and reads relevant HTML/JS files
    "CSS layout is broken" → Reads your stylesheets automatically
    "Python error in main.py" → Reads main.py and related files

✨ EXAMPLES:
    "optimize my website performance"
    "add mobile responsive design"  
    "fix the navigation menu bug"
    "why isn't my form submitting?"
    """)

if __name__ == "__main__":
    agent_interface()