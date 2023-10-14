FROM postgres:14.0-alpine   

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=124578pz
ENV POSTGRES_DB=snet

COPY snet.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
