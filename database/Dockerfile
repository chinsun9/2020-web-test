FROM mariadb:10.5

ENV MYSQL_USER mysql_user
ENV MYSQL_PASSWORD 1234
ENV MYSQL_ROOT_PASSWORD 1234
ENV MYSQL_DATABASE webtest

COPY ./scripts/ /docker-entrypoint-initdb.d/
