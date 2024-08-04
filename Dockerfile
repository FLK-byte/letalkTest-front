FROM node:20.11.1
WORKDIR /app
COPY ./letalkTest-front/package*.json ./
RUN yarn
COPY ./letalkTest-front .
EXPOSE 3000
CMD ["sh", "-c", "yarn && yarn dev"]