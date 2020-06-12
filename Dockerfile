# base image
FROM python:3.7-alpine

# set environment variables
ENV DEBUG 0
# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# install node
#RUN apt-get update \
#    && apt-get install nodejs -y

# Install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /requirements.txt
# apk is the package manager which comes in installed with python alpine
RUN apk add --update --no-cache postgresql-client jpeg-dev
# virtual keyword is used to set an alias for our dependency
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev libffi-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

# npm package depends on nodejs
RUN apk add --update npm

# Install Front-end dependencies
COPY ./package.json /package.json
RUN npm install

# Setup directory structure
RUN mkdir /app
WORKDIR /app
COPY ./app/ /app

# build static files
WORKDIR /
COPY ./webpack.config.js ./.babelrc /
RUN npm run build

WORKDIR /app

ARG DB_HOST_ARG
ARG DB_NAME_ARG
ARG DB_USER_ARG
ARG DB_PASS_ARG

ENV DB_HOST=$DB_HOST_ARG
ENV DB_NAME=$DB_NAME_ARG
ENV DB_USER=$DB_USER_ARG
ENV DB_PASS=$DB_PASS_ARG

# use this for apline
#RUN adduser -D user
#USER user

#otherwise, for ubuntu
#RUN useradd -m user
#USER user

EXPOSE 8000

RUN python manage.py collectstatic --noinput
# python manage.py migrate command ?
# CMD gunicorn app.wsgi:application --bind 0.0.0.0:8000

CMD python manage.py wait_for_db && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000

# heroku randomly assigns $PORT env variable
#EXPOSE 8000
#RUN python manage.py collectstatic --noinput
# CMD gunicorn app.wsgi:application --bind 0.0.0.0:$PORT 