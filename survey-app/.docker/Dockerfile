FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install --production --silent && mv node_modules ../
RUN npm i
COPY . .
EXPOSE 5500
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
