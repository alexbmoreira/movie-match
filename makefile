BACKEND=cd backend &&
FRONTEND=cd frontend &&

install-be:
	$(BACKEND) pip install -r requirements.txt

install-fe:
	$(FRONTEND) npm install
	
run-backend:
	$(BACKEND) python manage.py runserver
	
run-frontend:
	$(FRONTEND) npm run serve

migrate:
	$(BACKEND) python manage.py makemigrations $(app) && python manage.py migrate $(app)

test:
	$(BACKEND) python manage.py test $(app)

lint:
	scripts/lint.sh
