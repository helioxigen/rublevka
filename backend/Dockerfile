FROM python:3.7.2-stretch
ADD . /home/app
WORKDIR /home/app

RUN pip install --no-cache-dir -r requirements.txt

CMD python main.py