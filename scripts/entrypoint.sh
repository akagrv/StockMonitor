#!/bin/sh

# if any error, exit
set -e

#python manage.py migrate        # Apply database migrations
python manage.py collectstatic --noinput  # collect static files to the root dir

# uwsgi --socket :8000 --master --enable-threads --module app.wsgi
gunicorn --workers=2 --bind=0.0.0.0:8000 app.wsgi:application
