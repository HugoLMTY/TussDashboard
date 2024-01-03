FROM node:18

WORKDIR /app

COPY tuss-back/package.json ./
COPY ./shared ./shared

RUN npm install
RUN npm remove shared-types
RUN npm i ./shared

COPY tuss-back/src ./src
COPY tuss-back/tsconfig.json ./
COPY tuss-back/nest-cli.json ./

COPY tuss-back/. .

EXPOSE 3000

CMD ["npm", "run", "start"]
