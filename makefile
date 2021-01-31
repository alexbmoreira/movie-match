install-be:
	pip install -r requirements.txt

install-fe:
	cd frontend && npm install
	
run-backend:
	python manage.py runserver
	
run-frontend:
	cd frontend && npm run serve

migrate:
	python manage.py makemigrations $(app) && python manage.py migrate $(app)

test:
	python manage.py test $(app)

lint:
	scripts/lint.sh
