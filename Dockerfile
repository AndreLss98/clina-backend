FROM node:16-slim
WORKDIR /app
COPY ./ ./
RUN yarn
CMD yarn start:dev
EXPOSE 3000