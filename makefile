BACKEND=cd backend &&
FRONTEND=cd frontend &&
MOBILE=cd mobile &&

install-b:
	$(BACKEND) pip install -r requirements.txt

install-f:
	$(FRONTEND) npm install

install-m:
	$(MOBILE) yarn install

run-b:
	$(BACKEND) python manage.py runserver

run-f:
	$(FRONTEND) npm run serve

run-m:
	$(MOBILE) expo start

run-m-clean:
	$(MOBILE) expo start

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

lint-m:
	$(MOBILE) npm run lint
