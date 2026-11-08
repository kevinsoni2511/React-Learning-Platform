import json
import os
import sys

# Ensure current dir is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from data_modules_1_3 import MODULES_1_TO_3
from data_modules_4_6 import MODULES_4_TO_6
from data_modules_7_9 import MODULES_7_TO_9
from data_modules_10_12 import MODULES_10_TO_12
from data_projects import PROJECTS_DATA
from data_interview import INTERVIEW_PREP_DATA
from ui_template import get_html_template

def main():
    print("Beginning generation of single-file index.html...")

    # Combine all 12 modules
    all_modules = MODULES_1_TO_3 + MODULES_4_TO_6 + MODULES_7_TO_9 + MODULES_10_TO_12
    print(f"Total Modules assembled: {len(all_modules)}")
    assert len(all_modules) == 12, f"Expected 12 modules, got {len(all_modules)}"

    total_lessons = sum(len(m.get('lessons', [])) for m in all_modules)
    total_exercises = sum(len(m.get('exercises', [])) for m in all_modules)
    print(f"Total Theoretical Core Lessons: {total_lessons}")
    print(f"Total Practical Exercises: {total_exercises}")
    print(f"Total Capstone Projects: {len(PROJECTS_DATA)}")
    print(f"Total Interview Q&A items: {len(INTERVIEW_PREP_DATA)}")

    # Verify all 12 parts match PDF structure
    expected_exercise_counts = {
        1: 15,
        2: 4,
        3: 5,
        4: 4,
        5: 7,
        6: 3,
        7: 4,
        8: 11,
        9: 3,
        10: 3,
        11: 2,
        12: 2
    }
    for m in all_modules:
        num = m['number']
        actual_ex = len(m.get('exercises', []))
        expected_ex = expected_exercise_counts.get(num, 0)
        assert actual_ex == expected_ex, f"Module {num} exercises mismatch: expected {expected_ex}, got {actual_ex}"
        print(f"  ✓ Module {num} ('{m['title']}'): {actual_ex} practical exercises verified.")

    modules_json = json.dumps(all_modules, ensure_ascii=False)
    projects_json = json.dumps(PROJECTS_DATA, ensure_ascii=False)
    interview_json = json.dumps(INTERVIEW_PREP_DATA, ensure_ascii=False)

    html_content = get_html_template(modules_json, projects_json, interview_json)

    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "index.html"))
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"\nSUCCESS! index.html created at: {output_path}")
    print(f"File size: {file_size_kb:.2f} KB ({os.path.getsize(output_path):,} bytes)")

if __name__ == "__main__":
    main()
