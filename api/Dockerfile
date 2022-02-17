FROM python:3.7
COPY requirements.txt .
RUN pip install flask flask_cors gunicorn PyYAML coloredlogs requests paho-mqtt
COPY ./src/ /app/python/
# Create a directory for the image/videos
RUN mkdir /app/ui
WORKDIR /app/python
EXPOSE 8000
CMD ["gunicorn", "--threads", "8", "--workers", "2", "-b", "0.0.0.0:8000", "api:app"]
#CMD ["python", "-m", "server.app"]
#CMD ["/bin/sh", "-c", "sleep 10000"]
