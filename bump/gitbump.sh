set -e

git fetch --tags # checkout action does not get these

# -v:refname is a version sort
oldv=$(git tag --sort=-v:refname --list "v[0-9]*" | head -n 1)
echo "oldv: $oldv"

# if there is no version tag yet, let's start at 0.0.0
if [ -z "$oldv" ]; then
   echo "No existing version, starting at 0.0.0"
   oldv="0.0.0"
fi

newv=$(docker run --rm -v "$PWD":/app jdwills95/bump --input "$oldv" patch)
echo "newv: $newv"

git tag -a "v$newv" -m "version $newv"
git push --follow-tags