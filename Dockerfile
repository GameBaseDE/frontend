################
# Run in NGINX #
################
FROM nginx:alpine
COPY /dist/GameBase-Frontend /usr/share/nginx/html
COPY /nginx.default.conf /usr/share/nginx.default.conf.template
COPY /assign_env_vars.sh /usr/local/bin/assign_env_vars.sh

RUN chmod 777 /usr/local/bin/assign_env_vars.sh

# When the container starts, replace the env.js with values from environment variables
CMD /usr/local/bin/assign_env_vars.sh; exec nginx -g 'daemon off;'
