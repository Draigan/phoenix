#!/bin/bash

# Path to the JavaScript file
file_path="/home/dre/repos/son/data/coolvideos.js"

# Check if the file exists
if [ ! -f "$file_path" ]; then
	echo "Error: File '$file_path' does not exist."
	exit 1
fi

# Temporary file to store the modified content
temp_file=$(mktemp)

# Remove double quotes around require() calls and append to the temporary file
sed 's/"\(require([^)]*)\)"/\1/g' "$file_path" >"$temp_file"

# Add export const coolVideos = to the start of the file
echo -e "export const coolVideos =\n" | cat - "$temp_file" >"$temp_file.tmp" && mv "$temp_file.tmp" "$temp_file"

# Add export default coolVideos; on a new line at the end of the file
echo -e "\nexport default coolVideos;\n" >>"$temp_file"

# Replace the original file with the modified content
mv "$temp_file" "$file_path"

echo "Double quotes around require() calls have been removed and export statements added in '$file_path'."
