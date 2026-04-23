FROM python:3.9-slim

WORKDIR /app

# Install dependencies first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Hugging Face Spaces open port 7860
EXPOSE 7860

# Command to run on Hugging Face Spaces using gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
