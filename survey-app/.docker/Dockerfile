FROM node:lts-alpine as build
WORKDIR /app
COPY . .
#RUN npm install --force
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/build /app
RUN npm install -g serve 
EXPOSE 3000
CMD ["serve", "-s", "."]
