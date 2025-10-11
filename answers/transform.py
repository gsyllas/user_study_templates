import json
import sys
from pathlib import Path

def transform_survey(input_path):
    # Load JSON
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    answers = data.get("answers", {})
    test_files = data.get("test_survey", [])

    # Build test_survey mapping
    test_survey = {}
    for i, wav in enumerate(test_files, start=1):
        qa_key = f"question1a-{i}"
        qb_key = f"question1b-{i}"
        test_survey[wav] = {
            "question1a": answers.get(qa_key),
            "question1b": answers.get(qb_key)
        }

    # Build comp_survey mapping (merge comp_survey_1, comp_survey_2, etc.)
    comp_survey = {}
    comp_keys = [k for k in data.keys() if k.startswith("comp_survey_")]

    counter = 1
    for ck in comp_keys:
        comp_list = data[ck]
        for i in range(0, len(comp_list), 2):
            if i + 1 < len(comp_list):
                key = f"{comp_list[i]}-{comp_list[i+1]}"
                comp_survey[key] = answers.get(f"question2-{counter}")
                counter += 1

    # Final transformed JSON
    result = {
        "test_survey": test_survey,
        "comp_survey": comp_survey
    }

    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python transform_survey.py <input_json_path>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = input_path.with_name(f"{input_path.stem}_transformed.json")

    transformed = transform_survey(input_path)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(transformed, f, indent=4, ensure_ascii=False)

    print(f"✅ Transformed file saved to: {output_path}")
