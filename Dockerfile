FROM amio/node-chrome as build-stage
LABEL maintainer="Kevin Reis <reis.kevin@student.dhbw-karlsruhe.de>, Leonhard Gahr <leonhard@gahr.dev>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ARG configuration=production

# copy package.json and package-lock.json
COPY package*.json /app/
RUN npm install
RUN npm install -g @angular/cli@latest

COPY ./ /app/
RUN ng build --prod --build-optimizer=true --aot=true --extract-css=true --named-chunks=false --vendor-chunk=true

# built files are in /app/dist/NG-Frontend/


FROM nginx

# Add application files
COPY --from=build-stage /app/dist/NG-Frontend/ /var/www/html
COPY --from=build-stage /app/nginx/site.conf /etc/nginx/conf.d/default.conf

#Expose the port
EXPOSE 4200

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
