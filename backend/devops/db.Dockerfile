FROM postgres:11.1

RUN apt-get update
RUN apt-get -qq install postgresql-11-postgis-2.5

COPY ./data/ /data/