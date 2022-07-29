FROM node

RUN mkdir -p /usr/src/frontend

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]