from claude import ask

print("💬 Chat with Claude (type 'quit' to exit)")

while True:
    question = input("\nYou: ")
    if question.lower() == 'quit':
        break
    ask(question)