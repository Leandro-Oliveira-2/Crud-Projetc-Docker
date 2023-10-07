FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install --force --legacy-peer-deps

COPY . .

EXPOSE 8081

CMD ["npm","run","run:dev"]