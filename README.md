# InternetHealthMonitorUiApp
UI for internethealthlogger

Following Environment Variables Required:
API_BASE_URL='Address of API'

Example Docker run:
sudo docker run -e API_BASE_URL='http://localhost:8000' -p 4200:80 --name internethealthloggerui darthmanatee/internethealthloggerui

Docker Hub for UI:
https://hub.docker.com/repository/docker/darthmanatee/internethealthloggerui/general

Docker Hub for API:
https://hub.docker.com/repository/docker/darthmanatee/internethealthlogger/general