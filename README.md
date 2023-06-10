
# Create .env in root and Update env values like below
```
MONGODB_USER=root
MONGODB_PASSWORD=??????
MONGODB_DATABASE=todoapp
MONGODB_LOCAL_PORT=27017
MONGODB_DOCKER_PORT=27017
NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=80
```
# Project setup and run
```
docker-compose up -d --build
```
# Access application to PORT NODE_LOCAL_PORT
```
http://localhost:3000/tasks
```