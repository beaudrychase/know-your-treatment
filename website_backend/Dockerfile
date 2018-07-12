FROM python:3

RUN apt-get update            && \
    apt-get -y install sudo vim postgresql

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

ENTRYPOINT /app/init.sh && /bin/bash
