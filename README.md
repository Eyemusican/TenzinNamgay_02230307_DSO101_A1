# Introduction

This assignment is divided into three major parts focusing on deploying a simple web application using Docker and Render.com. The app is a basic **To-do List** built using a full-stack architecture with database integration and continuous deployment configuration.

### Building a Simple To-do Application

**For the frontend part**: i have used next.js with shadcn adn designed a simple UI
**Backend**: Node.js with Express 
**Database**: PostgreSQL (connected using Prisma ORM)  
**Postgres tool** :  pgAdmin 

### Backend
- CRUD APIs for tasks
- Connected to PostgreSQL using Prisma ORM
- Environment variables set in `.env`

![alt text](<to-do/assets/Screenshot 2025-04-28 004753.png>)

### Frontend
- User Interface for adding, editing, and deleting tasks

![alt text](to-do/assets/image6.png)


### Data-base

I created a todo table using pgAdmin, as shown in the image below, and successfully connected the PostgreSQL database to the backend using Prisma ORM.

![alt text](to-do/assets/image-1.png)


![alt text](to-do/assets/image5.png)



### Part A: Building and Pushing Docker Images

#### Backend Docker Image

Dockerfile 

```
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

# Direct node command
CMD ["node", "dist/index.js"]
```

Build and Push: 
```
docker build -t eyemusician/be-todo:02230307 .
docker push eyemusician/be-todo:02230307
```

### Frontend Docker Image

#### Dockerfile
```
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
#### Build and Push

```
docker build -t eyemusician/fe-todo:02230307 .
docker push eyemusician/fe-todo:02230307
```

output for above :

![alt text](to-do/assets/image3.png)


### Created Database on Render

1. Set up PostgreSQL database on Render
2. Got the database connection URL for backend

![alt text](image-3.png)

### Deployed Backend Service on Render

#### Deployment Method: Existing image from Docker Hub

#### Image: eyemusician/be-todo:02230307

#### Service Type: Web Service

Environment Variables Set:

```
Hostname : dpg-d0aamjjuibrs73bmrmr0-a

port : 5432

Username : todo_db_odbg_user

Password :  ********************

```

output : 
![alt text](image-1.png)

### Deployed Frontend Service on Render
#### Deployment Method: Existing image from Docker Hub
#### Image: yourdockerhub/fe-todo:studentID
#### Service Type: Web Service

Environment Variables Set:
```
REACT_APP_API_URL=https://be-todo-service.onrender.com
```

output : 

![alt text](image-2.png)




