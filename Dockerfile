FROM amio/node-chrome
LABEL maintainer="Kevin Reis <reis.kevin@student.dhbw-karlsruhe.de>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.8

COPY . /app

CMD ng serve --prod --host 0.0.0.0 --disable-host-check
