FROM node:lts-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY . .
CMD ["ionic", "build", "--prod"]