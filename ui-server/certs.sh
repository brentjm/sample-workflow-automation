#!/bin/bash
# Creates certificate and key for nginx
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout frigg.key -out frigg.crt
