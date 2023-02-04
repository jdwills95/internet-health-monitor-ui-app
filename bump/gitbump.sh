#!/usr/bin/env bash
set -e

git fetch --tags # checkout action does not get these

# -v:refname is a version sort
oldv=$(git tag --sort=-v:refname --list "v[0-9]*" | head -n 1)

# if there is no version tag yet, let's start at 0.0.0
if [ -z "$oldv" ]; then
   echo "No existing version, starting at 0.0.0"
   oldv="0.0.0"
fi

echo "oldv: $oldv"
newv="$oldv" | awk -F. -v OFS=. 'NF==1{print ++$NF}; NF>1{if(length($NF+1)>length($NF))$(NF-1)++; $NF=sprintf("%0*d", length($NF), ($NF+1)%(10^length($NF))); print}'
echo "newv: $newv"

git tag -a "v$newv" -m "version $newv"
git push --follow-tags
