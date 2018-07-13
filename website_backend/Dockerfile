FROM python:3

RUN apt-get update            && \
    apt-get -y install vim

RUN pip install --upgrade pip    && \
    pip --version                && \
    pip install autopep8         && \
    pip install coverage         && \
    pip install mypy             && \
    pip install numpy            && \
    pip install pylint           && \
    pip install flask            && \
    pip install flask-restless   && \
    pip install flask-mysql      && \
    pip install flask-sqlalchemy && \
    pip install requests         && \
    pip install flask-cors       && \
    pip install simplejson       && \
    pip list

RUN curl -sL https://deb.nodesource.com/setup_8.x | /bin/bash
RUN apt-get install -y nodejs
RUN npm install -g newman

ENV FLASK_DEBUG=1
ENV FLASK_APP=app.py

CMD ["python", "app.py"]
