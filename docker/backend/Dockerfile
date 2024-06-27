FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv 

RUN pip install flask pandas flask-cors numpy matplotlib gunicorn

COPY . .

CMD gunicorn --bind 0.0.0.0:5000 wsgi:app