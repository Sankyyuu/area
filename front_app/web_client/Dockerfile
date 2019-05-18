# base image
FROM node:9.6.1

#RUN mkdir -p /usr/src/app/webapp/

COPY ./ /usr/src/app/webapp/

WORKDIR /usr/src/app/webapp

RUN npm install --silent

CMD ["npm", "start"]