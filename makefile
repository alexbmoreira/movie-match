run-backend:
	python manage.py runserver

install:
	pip install -r requirements.txt

migrate:
	python manage.py makemigrations $(app) && python manage.py migrate $(app)
