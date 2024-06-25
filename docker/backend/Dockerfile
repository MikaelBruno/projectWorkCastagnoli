FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv 

RUN pip install flask pandas flask-cors numpy matplotlib

COPY . .

EXPOSE 5000

CMD ["python", "WSGI.py"]