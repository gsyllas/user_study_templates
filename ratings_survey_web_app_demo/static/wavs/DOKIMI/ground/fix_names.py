import os

def rename_audio_files(folder_path, old_prefix="cv_sample", new_prefix="sentence", extension=".wav"):
    """
    Renames audio files (or any specified extension) in a given folder
    by replacing a specified prefix in their names.

    Args:
        folder_path (str): The path to the folder containing the files.
        old_prefix (str): The prefix to be replaced.
        new_prefix (str): The new prefix to use.
        extension (str): The file extension to target (e.g., ".wav", ".mp3").
                         Only files with this extension will be considered.
    """
    try:
        # Ensure the extension starts with a dot for consistent comparison
        if not extension.startswith('.'):
            extension = '.' + extension

        # Check if the folder exists before attempting to list its contents
        if not os.path.isdir(folder_path):
            print(f"Error: The specified folder does not exist: '{folder_path}'")
            return

        print(f"Starting rename operation in: '{folder_path}'")
        print(f"Looking for files starting with '{old_prefix}' and ending with '{extension}'")

        renamed_count = 0
        skipped_count = 0

        for filename in os.listdir(folder_path):
            if filename.endswith(extension) and filename.startswith(old_prefix):
                base_name_without_prefix = filename[len(old_prefix):-len(extension)]
                new_filename = f"{new_prefix}{base_name_without_prefix}{extension}"

                old_filepath = os.path.join(folder_path, filename)
                new_filepath = os.path.join(folder_path, new_filename)

                os.rename(old_filepath, new_filepath)
                print(f"Renamed '{filename}' to '{new_filename}'")
                renamed_count += 1
            else:
                # Provide specific reasons for skipping
                if not filename.startswith(old_prefix):
                    print(f"Skipped '{filename}' - does not start with '{old_prefix}'")
                elif not filename.endswith(extension):
                    print(f"Skipped '{filename}' - not a '{extension}' file")
                else: # Should ideally not be reached if conditions are exhaustive
                    print(f"Skipped '{filename}' - no matching conditions")
                skipped_count += 1

        print(f"\nRename operation completed.")
        print(f"Files renamed: {renamed_count}")
        print(f"Files skipped: {skipped_count}")

    except FileNotFoundError:
        # This specific error is handled by the os.path.isdir check now.
        pass
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # --- IMPORTANT: Set your actual folder path here ---
    # Based on your screenshot, if your script is in the DOKIMI folder level
    # If the script is elsewhere, adjust the path accordingly.
    # For example, if the script is in 'det_LORA', then the path would be 'ground'
    # If the script is in 'det', then the path would be 'det_LORA/ground'
    # If the script is in the 'ground' folder itself, the path would be '.' (current directory)

    # Assuming your script is at the level of 'DOKIMI' (or its parent)
    # The path will be relative to where you run the script, or an absolute path.
    target_folder_path = "." # Adjust this if your script location is different!

    # You can also use an absolute path for robustness:
    # target_folder_path = r"C:\Users\yourusername\path\to\DOKIMI\det\det_LORA\ground"
    # Or for Linux/macOS:
    # target_folder_path = "/home/yourusername/path/to/DOKIMI/det/det_LORA/ground"


    print(f"Attempting to rename files in: {target_folder_path}")
    print("Files *before* renaming:")
    if os.path.isdir(target_folder_path):
        for f in os.listdir(target_folder_path):
            print(f"  {f}")
    else:
        print(f"  Folder does not exist: {target_folder_path}")
    print("-" * 40)


    # Run the rename function
    # It will change "cv_sample_XX.wav" to "sentence_XX.wav"
    rename_audio_files(target_folder_path, old_prefix="cv_sample", new_prefix="sentence", extension=".wav")

    print("-" * 40)
    print("Files *after* renaming:")
    if os.path.isdir(target_folder_path):
        for f in os.listdir(target_folder_path):
            print(f"  {f}")
    else:
        print(f"  Folder does not exist: {target_folder_path}")