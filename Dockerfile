# SERVER WEB
FROM nginx:alpine

# COPIA DOS ARQUIVOS PARA O CONTAINER
COPY index.html /usr/share/nginx/html
COPY servico1.html /usr/share/nginx/html
COPY servico2.html /usr/share/nginx/html
COPY servico3.html /usr/share/nginx/html
COPY styles.css /usr/share/nginx/html
COPY background.jpg /usr/share/nginx/html

# EXPOSE PORTA
EXPOSE 80

