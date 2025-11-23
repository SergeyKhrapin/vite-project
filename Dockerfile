FROM node: 20.4-alpines.18 AS base

ARG VITE BRANCH NAME
ARG VITE_ VERSION
ARG BUILD NUMBER

ENV VITE_BRANCH_NAME=${VITE_BRANCH_ NAME}
ENV VITE_VERSION=${VITE_VERSION}
ENV BUILD_ NUMBER=${BUILD _NUMBER}

WORKDIR /app

COPY package. json
COPY package-lock. json •
RUN npm install --silent
COPY . .

RUN echo "Branch: "${VITE_BRANCH NAME}"; Version: "${VITE_VERSION}"; Build Number: "${BUILD _NUMBER}"" > /app/version.txt

FROM base as build

RUN npm run vitest && npm run build

FROM nginx: stable-alpine3.17
COPY --from=build /app/build /usr/share/nginx/htmll
COPY --from=build /app/version.txt /usr/share/nginx/html/version.txt
COPY config/nginx /etc/nginx

EXPOSE 80
CMD nginx -g "daemon off;"