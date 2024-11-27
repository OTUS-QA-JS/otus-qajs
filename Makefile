include .env

test_build:
	docker build -t otus-qajs .

test_shell:
	docker run -v "$(PWD):/app" -v /app/node_modules -it otus-qajs bash

test_run:
	docker run --memory=2G --cpus=4 otus-qajs sh -c "NODE_OPTIONS=\"--max-old-space-size=2048\" npx jest"
