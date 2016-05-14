###########################################################
#
# Dockerfile for tasks-collector-exchange
#
###########################################################

# Setting the base to nodejs 4.4.4
FROM mhart/alpine-node:4.4.4

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV TASKS_COLLECTOR_EXCHANGE_TAG tasks-collector-exchange
ENV TASKS_COLLECTOR_EXCHANGE_URL http://exchange.no
ENV TASKS_COLLECTOR_EXCHANGE_HOST localhost
ENV TASKS_COLLECTOR_EXCHANGE_PORT 8000
ENV EWS_TASKS_URL https://epost.vfk.no/ews/Exchange.asmx
ENV EWS_TASKS_USERNAME domain\\username
ENV EWS_TASKS_PASSWORD password
ENV EWS_TASKS_DOMAIN @skole.t-fk.no
ENV EWS_TASKS_OWA_URL https://epost.vfk.no/owa/#path=/tasks
ENV EWS_TASKS_LIMIT 20

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]
