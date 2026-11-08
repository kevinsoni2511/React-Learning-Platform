import re
import os

def fix_file(filename):
    if not os.path.exists(filename):
        print(f"Skipping {filename}, does not exist")
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex matches ': `' followed by anything until '`' followed by comma, closing brace or newline
    def replacer(match):
        inner = match.group(1)
        # Escape any triple quotes
        inner = inner.replace('"""', r'\"\"\"')
        return ': """' + inner + '"""'

    fixed = re.sub(r':\s*`([\s\S]*?)`(?=\s*[,}\]\n])', replacer, content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(fixed)
    print(f"Successfully processed {filename}")

if __name__ == '__main__':
    files = [
        'build_system/data_modules_1_3.py',
        'build_system/data_modules_4_6.py',
        'build_system/data_modules_7_9.py',
        'build_system/data_modules_10_12.py',
        'build_system/data_projects.py'
    ]
    for fn in files:
        fix_file(fn)
