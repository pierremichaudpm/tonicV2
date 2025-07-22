import anthropic
import os

# Setup Claude with your API key
client = anthropic.Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

def ask(question):
    """Ask Claude anything and get an answer"""
    print(f"🤔 Asking Claude: {question}")
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2000,
        messages=[{"role": "user", "content": question}]
    )
    
    answer = response.content[0].text
    print(f"🤖 Claude says:\n{answer}\n")
    return answer

# Test it immediately
if __name__ == "__main__":
    print("🚀 Testing Claude connection...")
    
    # Simple test
    ask("Say hello and confirm you're working!")
    
    # Ask Claude to create something
    ask("Create a simple HTML button that shows an alert when clicked")