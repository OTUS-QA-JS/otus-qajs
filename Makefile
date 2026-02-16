include .env

test_build:
	docker build -t otus-qajs -t registry.gitlab.com/freepad/otus-qajs-2026-02 .

test_push:
	docker push registry.gitlab.com/freepad/otus-qajs-2026-02

test_shell:
	docker run -v "$(PWD):/app" -v /app/node_modules -it otus-qajs bash

test_run:
	docker run --memory=2G --cpus=4 otus-qajs sh -c "NODE_OPTIONS=\"--max-old-space-size=2048\" npx jest"

allure:
	docker build -f Dockerfile_allure -t allure  -t registry.gitlab.com/freepad/otus-qajs-2026-02/allure .
	docker push registry.gitlab.com/freepad/otus-qajs-2026-02/allure
