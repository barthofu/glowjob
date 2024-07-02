# ======================================
# Builder
# ======================================
FROM node:18-alpine as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npx nx run prisma:generate
RUN cp ./node_modules/.prisma/client/*.js ./node_modules/@prisma/client
RUN npx nx build web --prod

# ======================================
# Runner
# ======================================
FROM nginx:stable-alpine

COPY --from=build /app/dist/apps/web /usr/share/nginx/html
COPY ./infra/nginx/web.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Serve the static web app
CMD ["nginx", "-g", "daemon off;"]
