FROM python:3.10-slim-bullseye
WORKDIR /app
COPY requirements.txt .flaskenv ./
RUN pip install --no-cache-dir -r requirements.txt
COPY static ./static
COPY templates ./templates
COPY app.py .
# removed because ping doesn't work with non-root user
# RUN groupadd -r edge && useradd -r -g edge edge
# USER edge
CMD ["gunicorn", "-b", ":5000", "app:app", "--timeout", "600"]