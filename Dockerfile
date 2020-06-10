# base image
FROM nikolaik/python-nodejs:python3.8-nodejs12

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
# RUN apk add --update --no-cache postgresql-client
# virtual keyword is used to set an alias for our dependency
# RUN apk add --update --no-cache --virtual .tmp-build-deps \
#    gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt
# RUN apk del .tmp-build-deps

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

#ARG DB_HOST
#ARG DB_NAME
#ARG DB_USER
#ARG DB_PASS

ENV DB_HOST=ec2-52-44-55-63.compute-1.amazonaws.com
ENV DB_NAME=d3bauldf0g77ti
ENV DB_USER=orrnjvxnmkxvav
ENV DB_PASS=4966ef3148846d808556cf066aabad1eda1d4de4e1ff9fd0a45b84e9788d96eb

# use this for apline
#RUN adduser -D user
#USER user

#otherwise, for ubuntu
RUN useradd -m user
USER user

#CMD python manage.py wait_for_db && \
#    python manage.py migrate && \
#    python manage.py runserver

# heroku randomly assigns $PORT env variable
CMD gunicorn app.wsgi:application --bind 0.0.0.0:$PORT