include .env

test_build:
	docker build -t otus-qajs .

test_shell:
	docker run -v "$(PWD):/app" -v /app/node_modules -it otus-qajs bash

test_run:
	docker run --memory=2G --cpus=4 otus-qajs sh -c "NODE_OPTIONS=\"--max-old-space-size=2048\" npx jest"

allure_build:
	docker build -f .\Dockerfile_allure -t otus-qajs-allure .

allure_ci_upd:
	docker tag otus-qajs-allure registry.gitlab.com/freepad/qajs-2023-12/allure
	docker push registry.gitlab.com/freepad/qajs-2023-12/allure

allure_generate:
	docker run -v "$(PWD)/reports/allure-results:/app/allure-results" -v "$(PWD)/reports/allure-report:/app/allure-report" otus-qajs-allure
