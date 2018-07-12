FROM python:3

RUN apt-get update            && \
    apt-get -y install vim

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
    pip install flask_cors     && \
    pip install flask-sqlalchemy && \
    pip install requests        &&\
    pip list

ENV FLASK_DEBUG=1
ENV FLASK_APP=app.py

CMD /bin/bash
