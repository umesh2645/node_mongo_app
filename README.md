
# 1. Create .env in root and Update env values like below
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
# 2. In kubernates env
## Step 1: Login, create image , tag it and push to docker hub
```
docker login
docker build -t umesh2645/node_mongo_app:latest -t umesh2645/node_mongo_app:1.0 .
docker push umesh2645/node_mongo_app --all-tags
or a specific tag
docker push umesh2645/node_mongo_app:latest
```
## Step 2: create mongo secrates and config map

### RUN below command to create a new ns
```
kubectl create ns nodemongoapp

Swith to this ns

kubectl config set-context --current --namespace=nodemongoapp
```
###  a) RUN below command in Git bash to get base 64 encoded of text
```
 echo -n 'root' | base64
 echo -n '123456' | base64
and updating above base 64 in mongo-secret.yaml file and apply this change as below in kubernates
kubectl apply -f mongo-secret.yaml
```
### b) OR using cmd line directly
```
kubectl create secret generic mongodb-secret --from-literal=mongo-root-username=root --from-literal=mongo-root-password=123456
RUN below command to check: 
kubectl get secret
kubectl describe secret mongodb-secret
```

## create config map for mongodb
```
RUN below command
```



###### compands

kubectl get pv
kubectl get pvc
kubectl apply -f .\mongodb-deployment.yml
kubectl get statefulset

kubectl get storageclass

Storage Class -> PVC -> Reference claim in pod
Create PVC and use this in db statefull deployments

kubectl create -f .\mongodb-pvc.yaml


