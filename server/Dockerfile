FROM node:18-alpine

#set working directory

WORKDIR /app

#COPY .json file
COPY package*.json ./
RUN npm install

#copy all files
COPY . .

EXPOSE 8000

#start the backend server
CMD ["nodemon", "index.js"]