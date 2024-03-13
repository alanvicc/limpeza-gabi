# SERVER WEB
FROM nginx:alpine

# COPIA DOS ARQUIVOS PARA O CONTAINER
COPY index.html /usr/share/nginx/html
COPY script.js /usr/share/nginx/html

# EXPOSE PORTA
EXPOSE 80

