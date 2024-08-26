### list all folders inside image
docker run <image_name> ls

### listing all containers
docker ps

### list all ever created containers 
docker ps --all

### docker run = docker create + docker start
docker create <image_name>
// oaisjdlj3lm7p456p45p4m4poi54op546ko456
docker start -a oaisjdlj3lm7p456p45p4m4poi54op546ko456

### delete all stopped containers
docker system prune

### get all outputs from container
docker logs <container_id>

### stop container
docker stop <container_id>
//stop after some seconds (THIS FIRST)

### kill container
docker kill <container_id>
//stop immediately

### execute an additional command (second program inside container) in a container
### -it === -i -t is possibility to input text or commands
docker exec -it <container_id> <command>
docker exec -it c416bdcaf419 redis-cli

### go inside dir and use commands (CTRL D - exit)
### sh (shell) is CMD inside container
docker exec -it c416bdcaf419 sh
CMD: # ls //bin  boot  data  dev  etc  home  lib  lib64  media  mnt  opt  proc  root

### (run docker and attach STDIN -it) got inside shell
docker run -it <container_image> sh

### Build Docker image:
docker build -t inversum-api .

### Build Docker image with tags
docker build -t <docker_id>/<project_name>:<version> .
docker build -t 3dgenerik/inversum-api:v1 .


### Pokreni Docker container:
docker run -p 3000:3000 inversum-api 


### Run docker-compose.yaml
docker-compose up --build

### tag docker image
docker tag inversum-api 3dgenerik/inversum-api:v1

### run another docker compose file
docker-compose -f docker-compose.prod.yaml up
docker-compose -f docker-compose.yaml up --build

### run docker container in background
docker-compose up -d

### stop containers
docker-compose down

# SEND TO HUB

## sign in on docker
docker login

## push docker image on docker hub
docker push <username>/inversum-api:v1

## pull from docker hub
docker pull <username>/inversum-api:v1

## run docker container
docker run -p 3000:3000 <username>/inversum-api:v1

