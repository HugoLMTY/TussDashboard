FROM node:18

WORKDIR /app

COPY tuss-front/package.json ./
COPY ./shared ./shared

RUN npm install
RUN npm remove shared-types
RUN npm i ./shared

COPY tuss-front/. .

EXPOSE 3000

CMD ["npm", "run", "dev"]
