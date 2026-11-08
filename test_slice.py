with open('d:/master-learning/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('code-editor-textarea')
print(text[pos-800:pos-200])
