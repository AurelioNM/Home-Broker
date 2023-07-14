# FROM 371822295414.dkr.ecr.us-east-2.amazonaws.com/node:latest
FROM node:14

RUN mkdir -p /home/ubuntu/app

RUN npm config set cache /home/node/app/.npm-cache --global

WORKDIR /home/ubuntu/app

COPY . .

CMD ["npm", "run-script", "start"]
