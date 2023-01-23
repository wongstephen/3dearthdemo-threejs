FROM node:19
WORKDIR /app
COPY package*.json .
RUN npm install
COPY /dist/ .
RUN npm install -g http-server
CMD ["http-server", "."]