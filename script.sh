#!/bin/bash
#
# This script demonstrates how to use an AI to interact with your codebase.
# It uses the 'aider' CLI to prompt the AI with a message and a list of files.
#
# Usage:
#   addToIndex ./src/features/tagManagement/api/tagManager.ts
#   prompt "for each function in the file, create a new separate file with that function."

# Global variables
export OLLAMA_API_BASE=http://127.0.0.1:11434

# Arrays
declare -a filesToIndex 

# Local variables
model="ollama/qwen2:latest"

#
# Resets the 'filesToIndex' array.
#
# Parameters:
#   None
# Example:
#   reset
# Returns:
#   None
#
function reset() {
  unset filesToIndex
  declare -a filesToIndex
}

# 
# Adds the given files to the 'filesToIndex' array.
#
# Parameters:
#   $@: The files to add to the 'filesToIndex' array.
# Example:
#   addToIndex file1 file2 file3
# Returns:
#   None
#
function addToIndex() {
  filesToIndex+=("$@")
}

#
# Searches for files containing the given text and adds them to the 'filesToIndex' array.
#
# Parameters:
#   $1: The text to search for in the files.
#   $2: The file extension to search for. Default is '*.*'.
# Example:
#   indexFilesContainingText "function myFunction"
# Returns:
#   None
#
function indexFilesContainingText() {
  local text=$1
  local extension=${2:-*.*}

  local cmd="find . -type f -name \"$extension\" -exec grep -l \"$text\" {} +"
  local files=$(eval $cmd)
  local uniqueFiles=$(echo "$files" | sort | uniq)

  addToIndex ${uniqueFiles[@]}
}

#
# Indexes all files in the given directory.
#
# Parameters:
#   $1: The directory to index.
#   $2: The file extension to search for. Default is '*.*'.
# Example:
#   indexContentInDirectory "./src/features/tagManagement/api" "*.ts"
# Returns:
#   None
#
function indexContentInDirectory() {
  local directory=$1
  local extension=${2:-*.*}

  local files=`find "$directory" -type f -name "$extension"`

  addToIndex ${files[@]}
}

#
# Lists all file paths in the given directory.
#
# Parameters:
#   $1: The directory to list file paths from.
#   $2: The file extension to search for. Default is '*.*'.
# Example:
#   listFilePathsInDirectory "./src/features/tagManagement/api" "*.ts"
# Returns:
#   A list of file paths, like: "file1 file2 file3"
#
function listFilePathsInDirectory() {
  local directory=$1
  local extension=${2:-*.*}

  local files=`find "$directory" -type f -name "$extension"`

  echo "$files"
}

#
# Prompt the AI with the given message.
#
# Parameters:
#   $1: The message to prompt the AI with.
# Example:
#   prompt "Add a new function to the file."
# Returns:
#   None
#
function prompt() {

  # check if the files to index are empty
  if [ ${#filesToIndex[@]} -eq 0 ]; then
    echo "🙅 No files to index."
    exit 1
  fi

  local message=$1
  
  echo -e "🚀 Prompting AI with message:\n---\n$message\n---"

  aider --yes \
      --no-auto-test \
      --no-dirty-commits \
      --no-auto-commits \
      --model "$model" \
      --message="$message" \
      "$(getFilesToIndex)"
}

#
# Get the files to index.
#
# Parameters:
#   None
# Example:
#   getFilesToIndex
# Returns:
#   A list of indexed files, like: "file1 file2 file3"
#
function getFilesToIndex() {
  echo "${filesToIndex[@]}"
}

#
# Formats the output paths.
#
# Parameters:
#   $1: The paths to format.
# Example:
#   formatOuputPaths "file1 file2 file3"
# Returns:
#   A list of formatted paths, like: "file1\nfile2\nfile3"
#
function formatOuputPaths() {
  local paths="$1"

  echo $paths | tr ' ' '\n' # | sed 's/^/- /'
}

#
# Main
#
reset

filePaths=$(listFilePathsInDirectory "./src/features/tagManagement/api" "*.ts")
param1=$(formatOuputPaths "$filePaths")

indexFilesContainingText "tagManager" "*.ts*"
param2=$(formatOuputPaths "$(getFilesToIndex)")

message=$(cat <<EOF
The "tagManager" file does not exist anymore and you need to update your imports and references.

Functions inside are now split into multiple files:
$param1

For each of these files, change the imports and references replacing "tagManager" file with the new files:
$param2
EOF
)

prompt "$message"
