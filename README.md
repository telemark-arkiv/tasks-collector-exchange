[![Build Status](https://travis-ci.org/telemark/tasks-collector-exchange.svg?branch=master)](https://travis-ci.org/telemark/tasks-collector-exchange)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tasks-collector-exchange
Collect a user's tasks from exchange

## Inbound messages
This microservice listens for the following messages


- ```{cmd: 'collect-tasks', type: 'user'}```

## Outbound messages
This microservice emits the following messages

- ```{info: 'tasks', type:'user'}```

## Docker
Build the image

```sh
$ docker build -t tasks-collector-exchange .
```

Start

```sh
$ docker run -d --net host --name tasks-collector-exchange tasks-collector-exchange
```

From hub.docker.com

```sh
$ docker run -d --net host --name tasks-collector-exchange telemark/tasks-collector-exchange
```

Call the service

```sh
$ curl -d '{"cmd":"collect-tasks", "type": "user", "user":"enge"}' -v http://192.168.99.100:8000/act
```