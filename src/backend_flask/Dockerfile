# Copyright 2022 Siemens AG
# This file is subject to the terms and conditions of the MIT License.  
# See LICENSE file in the top-level directory

FROM python:3.10-slim-bullseye
WORKDIR /app
COPY requirements.txt .flaskenv ./
RUN pip install --no-cache-dir -r requirements.txt
COPY static ./static
COPY templates ./templates
COPY app.py .
CMD ["gunicorn", "-b", ":5000", "app:app", "--timeout", "600"]