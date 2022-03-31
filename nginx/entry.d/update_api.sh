#!/bin/bash
if [ -n "$APIURL" ]; then
    echo "Updating API_URL to $APIURL"
    sed -i "s,window.API_URL =.*,window.API_URL = \"$APIURL\"," /usr/share/nginx/html/env_vars.js
fi
if [ -n "$AUTHURL" ]; then
    echo "Updating AUTH_URL to $AUTHURL"
    sed -i "s,window.AUTH_URL =.*,window.AUTH_URL = \"$AUTHURL\"," /usr/share/nginx/html/env_vars.js
fi
if [ -n "$AUTHSECRET" ]; then
    echo "Updating AUTH_SECRET to $AUTHSECRET"
    sed -i "s,window.AUTH_SECRET =.*,window.AUTH_SECRET = \"$AUTHSECRET\"," /usr/share/nginx/html/env_vars.js
fi
