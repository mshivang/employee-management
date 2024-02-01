# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY requirements.txt /backend/
RUN pip install -r requirements.txt

COPY . /backend/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
