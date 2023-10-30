APP = $(shell basename $(CURDIR))
build:
	docker build -t ${APP} .

run:
	docker run -p 5001:80 --rm -it ${APP}

build-dev:
	docker build -t ${APP}-dev -f Dockerfile-dev .

test: build-dev
	docker run --rm -it ${APP}-dev npm run test:ci

lint: build-dev
	docker run --rm -it ${APP}-dev npm run lint

.PHONY: build run build-dev test lint
