envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js
# don't replace the $uri in the nginx config :)
export uri="\$uri"
# if REST_API_URL is unset, temporarily set it to write the nginx config
add_env_var=false
if [[ -z "${REST_API_URL}" ]]; then
  add_env_var=true
  export REST_API_URL="http://gamebase-backend"
fi

envsubst < /usr/share/nginx.default.conf.template > /etc/nginx/conf.d/default.conf
export uri=

if [ "$add_env_var" = true ] ; then
  export REST_API_URL=
fi
