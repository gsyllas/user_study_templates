import json
import os
import math
from collections import defaultdict

# -------------------------------
# Helper statistical functions
# -------------------------------
def mean_or_none(values):
    """Return mean of list or None if empty."""
    return round(sum(values) / len(values), 3) if values else None

def std_or_none(values):
    """Return sample standard deviation or None if <2 values."""
    if len(values) < 2:
        return None
    m = sum(values) / len(values)
    var = sum((x - m) ** 2 for x in values) / (len(values) - 1)
    return round(math.sqrt(var), 3)

# -------------------------------
# Helper function to get model prefix
# -------------------------------
def get_model_prefix(path):
    return "/".join(path.split("/")[:2]) if "/" in path else path

# -------------------------------
# Folder with survey JSON files
# -------------------------------
INPUT_FOLDER = "./answers"

# -------------------------------
# Prepare output aggregator
# -------------------------------
combined_output = defaultdict(lambda: {
    "test_question1a": [],
    "test_question1b": [],
    "comp_question2": [],
    "stats": {}
})

# -------------------------------
# Iterate over all JSON files in folder
# -------------------------------
for filename in os.listdir(INPUT_FOLDER):
    if not filename.endswith(".json"):
        continue

    filepath = os.path.join(INPUT_FOLDER, filename)
    print(f"📥 Processing: {filename}")

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"⚠️ Skipped {filename} (invalid JSON): {e}")
        continue

    answers = data.get("answers", {})
    test_survey = data.get("test_survey", [])
    comp_survey_1 = data.get("comp_survey_1", [])


    # --- Categorize based on question4 - AI nowledge ---
    ai_nowledge = answers.get(f"question4")
    if ai_nowledge==1 or ai_nowledge==2 or ai_nowledge==3:
        continue


    # --- Correlate test_survey with question1a / question1b ---
    for i, path in enumerate(test_survey, start=1):
        model = get_model_prefix(path)
        a_val = answers.get(f"question1a-{i}")
        b_val = answers.get(f"question1b-{i}")
        if a_val is not None:
            combined_output[model]["test_question1a"].append(a_val)
        if b_val is not None:
            combined_output[model]["test_question1b"].append(b_val)

    # --- Correlate comp_survey_1 with question2 ---
    for i, path in enumerate(comp_survey_1, start=1):
        model = get_model_prefix(path)
        q_val = answers.get(f"question2-{i}")
        if q_val is not None:
            combined_output[model]["comp_question2"].append(q_val)

# -------------------------------
# Compute mean and deviation per model
# -------------------------------
for model, data_dict in combined_output.items():
    a_vals = data_dict["test_question1a"]
    b_vals = data_dict["test_question1b"]
    c_vals = data_dict["comp_question2"]

    data_dict["stats"] = {
        "test_question1a_mean": mean_or_none(a_vals),
        "test_question1a_std": std_or_none(a_vals),
        "test_question1b_mean": mean_or_none(b_vals),
        "test_question1b_std": std_or_none(b_vals),
        "comp_question2_mean": mean_or_none(c_vals),
        "comp_question2_std": std_or_none(c_vals),
    }

# -------------------------------
# Write results
# -------------------------------
combined_output = dict(combined_output)
OUTPUT_FILE = "analysis/experts_MOS_results.json"

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(combined_output, f, indent=4, ensure_ascii=False)

print(f"\n✅ Combined results (with mean & deviation) written to: {OUTPUT_FILE}")
