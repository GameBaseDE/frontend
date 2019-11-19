FROM amio/node-chrome as build-stage
LABEL maintainer="Kevin Reis <reis.kevin@student.dhbw-karlsruhe.de>, Leonhard Gahr <leonhard@gahr.dev>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ARG configuration=production

# copy package.json and package-lock.json
COPY package*.json /app/
RUN npm install
RUN npm install -g @angular/cli@8.3.8

COPY ./ /app/
RUN ng build --prod --build-optimizer=true --aot=true --extract-css=true --named-chunks=false --vendor-chunk=true --base-href https://dev.gahr.dev

# built files are in /app/dist/NG-Frontend/
