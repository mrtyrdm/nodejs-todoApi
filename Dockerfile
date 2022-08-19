FROM registry.semaphoreci.com/node:16
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser app
COPY todo_App/server .
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "start"]