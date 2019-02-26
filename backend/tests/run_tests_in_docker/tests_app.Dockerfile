FROM python:3.7.2-stretch

ADD . /home/app
COPY . /home/app
WORKDIR /home/app

RUN pip install -r test-requirements.txt

CMD echo 'Run api server' && \
  python main.py
