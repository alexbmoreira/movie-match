BACKEND=cd backend &&
FRONTEND=cd frontend &&
MOBILE=cd mobile &&

install-b:
	$(BACKEND) bundle install

install-f:
	$(FRONTEND) npm install

install-m:
	$(MOBILE) yarn install

run-b:
	$(BACKEND) bin/rails s

run-f:
	$(FRONTEND) npm run serve

run-m:
	$(MOBILE) expo start

run-m-clean:
	$(MOBILE) npm run start-clean

migrate:
	$(BACKEND) bin/rails db:migrate

test:
	$(BACKEND) bundle exec rspec

lint-f:
	$(FRONTEND) npm run lint

lint-m:
	$(MOBILE) npm run lint
