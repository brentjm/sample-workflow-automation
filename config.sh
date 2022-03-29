#!/bin/bash

##################################################
# Configuration script
# Brent Maranzano
# March 28, 2022

# usaga
# $./config.sh
##################################################

# Set the location of the UI homepage
echo "UI homepage"
sed -ie 's/REACT_APP_SERVERIP=/REACT_APP_SERVERIP="http:\/\/frigg\/swa-api"/' ui-server/react-app/.env

# Set the location of the backend server.
echo "backend server"
sed -ie 's/  "homepage":.*/  "homepage": "http:\/\/frigg\/swa-ui",/' ui-server/react-app/package.json

# Set the proper name for keys and certificates in the NginX configuration
echo "NinX.conf"
sed -ie 's/  ssl_certificate .*/  ssl_certificate        \/etc\/nginx\/ssl\/swa.crt;/' ui-server/nginx.conf    
sed -ie 's/  ssl_certificate_key.*/  ssl_certificate_key   \/etc\/nginx\/ssl\/swa.key;/' ui-server/nginx.conf    

# Set the name of the certificate and key in the Dockerfile
echo "NginX Dockerfile"
sed -ie 's/COPY.* \/etc\/nginx\/ssl\//COPY .\/swa.crt .\/swa.key \/etc\/nginx\/ssl\//' ui-server/Dockerfile 
