FROM python:3.12-alpine
WORKDIR /app
COPY bot.py .
ENV DB_PATH=/app/data/leader.db \
    STATE_PATH=/app/data/bot-state.json
CMD ["python", "-u", "bot.py"]
