virtenv:
	source ../.venv/bin/activate

install:
	pip install -r requirements.txt
	
run-backend:
	python manage.py runserver

migrate:
	python manage.py makemigrations $(app) && python manage.py migrate $(app)

test:
	python manage.py test $(app)

lint:
	scripts/lint.sh
