set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=darthmanatee
# image name
IMAGE=internethealthloggerui

docker build -t $USERNAME/$IMAGE:latest .
