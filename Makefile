APP = $(shell basename $(CURDIR))
build:
	docker build -t ${APP} .

run:
	docker run -p 5001:80 --rm -it ${APP}
