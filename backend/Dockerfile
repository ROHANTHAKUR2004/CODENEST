FROM ubuntu:20.04

RUN useradd -ms /bin/bash codenest

WORKDIR /home/codenest
 
RUN apt update && apt upgrade -y

RUN apt install nano curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt-get install -y nodejs

RUN echo "PS1='\w '" >> /home/codenest/.bashrc

WORKDIR /home/codenest/app