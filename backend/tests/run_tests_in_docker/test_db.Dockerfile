FROM postgres:latest
RUN apt-get update
RUN apt-get -y install postgresql-11-postgis-2.5

COPY ./db_data /docker-entrypoint-initdb.d/

EXPOSE 5432
