BACKEND=cd backend &&
FRONTEND=cd frontend &&

install-b:
	$(BACKEND) pip install -r requirements.txt

install-f:
	$(FRONTEND) npm install
	
run-b:
	$(BACKEND) python manage.py runserver
	
run-f:
	$(FRONTEND) npm run serve

migrate:
	$(BACKEND) python manage.py makemigrations $(app) && python manage.py migrate $(app)

test:
	$(BACKEND) python manage.py test $(app)

shell:
	$(BACKEND) python manage.py shell

lint-b:
	scripts/lint.sh

lint-f:
	$(FRONTEND) npm run lint
