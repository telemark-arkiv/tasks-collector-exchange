###########################################################
#
# Dockerfile for tasks-collector-exchange
#
###########################################################

# Setting the base to nodejs 4.4.3
FROM mhart/alpine-node:4.4.3

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

# Startup
CMD ["node", "service.js", "--seneca-log=type:act"]