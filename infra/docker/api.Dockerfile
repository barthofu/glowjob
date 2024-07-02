FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install
RUN npx nx run prisma:generate
RUN npx nx build api --prod

EXPOSE 80

CMD ["node", "/app/dist/apps/api/main.js"]