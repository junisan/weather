FROM node:alpine as builder
COPY . .
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++; \
    npm install; \
    npm run build; \
    npm prune --production; \
    apk del .gyp

FROM node:alpine
WORKDIR /app
COPY --from=builder dist dist
COPY --from=builder node_modules node_modules
RUN npm install pm2 -g;\
    apk update;\
    apk add ca-certificates;\
    rm -rf /var/cache/apk/*
USER node
CMD ["pm2-runtime", "dist/app.js"]
