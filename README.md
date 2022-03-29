# Automated Sample Workflow
User interface to coordinate sample workflow.

## Getting started
1. Set the address of the backend server
   `ui-server/react-app/.env`
2. Set the homepage of the user interface.
   `/ui-server/react-app/package.json`
2. Configure the keys and certificates for the NginX server.
  a. `ui-server/nginx.conf`
    i.  Set the server name in the server block.
    ii. Ensure the correct key and crt are defined in the server block.
  b. `ui-server/Dockerfile`
    i.  Ensure that the correct key and crt are copied to the container.
3. Start the services
   `docker-compose up --build -d`
4. (optional) configure the Traefik reverse-proxy
   `swa-ui.yml`
   
## Author
   Brent Maranzano<br/>
