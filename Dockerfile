################
# Run in NGINX #
################
FROM nginx:alpine
COPY /dist/GameBase-Frontend /usr/share/nginx/html
COPY /nginx.default.conf /etc/nginx/conf.d/default.conf

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]