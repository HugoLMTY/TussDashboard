FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm add @nestjs/cli
RUN npm install

COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
