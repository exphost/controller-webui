#!/bin/bash
if [ -n "$APIURL" ]; then
    echo "Updating API_URL to $APIURL"
    echo "window.API_URL = \"$APIURL\";" > /usr/share/nginx/html/env_vars.js
fi
