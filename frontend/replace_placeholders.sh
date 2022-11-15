#!/bin/bash

envsubst < /etc/nginx/html/assets/config/config.prod.json > /etc/nginx/html/assets/config/config.json

exec "$@"