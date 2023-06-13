# Kubernates

### Link for the code repository
```
https://github.com/umesh2645/node_mongo_app
```

### Docker hub URL for docker images

```
https://hub.docker.com/r/umesh2645/node_mongo_app
```

### URL for Service API tier to view the records from backend tier
```
http://localhost:3000/tasks
```

# Steps to run the project in Docker desktop locally 

## Step 1: Login, create image , tag it and push to docker hub
```
docker login
docker build -t umesh2645/node_mongo_app:latest -t umesh2645/node_mongo_app:1.0 .
docker push umesh2645/node_mongo_app --all-tags
or a specific tag
docker push umesh2645/node_mongo_app:latest
```
# Commands to RUN and start
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
```
```
kubectl apply -f mongo-secret.yaml
or
kubectl create secret generic mongodb-secret --from-literal=mongo-root-username=root --from-literal=mongo-root-password=123456

kubectl apply -f mongo-volumes.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-svc.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f node-deployment.yaml
```
# Access app on below URL
```
http://localhost:3000
http://localhost:3000/tasks
```

## Rollout and monitor changes 
```
kubectl rollout status deployment/nodejs
```

