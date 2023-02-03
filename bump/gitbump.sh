#!/bin/sh
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

echo inc $oldv
newv="$(inc $oldv)"
echo "newv: $newv"

git tag -a "v$newv" -m "version $newv"
git push --follow-tags

function inc()
{
    split(s, a, ".")

    len1 = length(a)
    if(len1==0)
        return -1
    else if(len1==1)
        return s+1

    len2 = length(a[len1])
    len3 = length(a[len1]+1)

    head = join(a, 1, len1-1)
    tail = sprintf("%0*d", len2, (a[len1]+1)%(10^len2))

    if(len2==len3)
        return head "." tail
    else
        return inc(head) "." tail
}

function join()
{
    for(i=x; i<y; i++)
        s = s a[i] "."
    return s a[y]
}