FROM python:3

RUN apt-get update            && \
    apt-get -y install vim postgresql

RUN pip install --upgrade pip  && \
    pip --version              && \
    pip install autopep8       && \
    pip install coverage       && \
    pip install mypy           && \
    pip install numpy          && \
    pip install pylint         && \
    pip install flask          && \
    pip install flask-restless && \
    pip install flask-mysql    && \
    pip install flask-sqlalchemy && \
    pip install simplejson      &&\
    pip install psycopg2       &&\
    pip list

EXPOSE 8080

# postgres setup
ENV POSTGRES_URL="127.0.0.1:5432"
ENV POSTGRES_USER="postgres"
ENV POSTGRES_PW="dbpw"
ENV POSTGRES_DB="kyt"

CMD bash
