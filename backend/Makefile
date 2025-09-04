ENV_FILE = .env

default: up

$(ENV_FILE):
	@echo "MONGODB_URI=mongodb://mongodb_container:27017/easygenerator_backend_db" > $(ENV_FILE)
	@echo "JWT_SECRET=super-secret-change-me" >> $(ENV_FILE)
	@echo "JWT_EXPIRES_IN=3600s" >> $(ENV_FILE)
	@echo "$(ENV_FILE) created with default values."

up: $(ENV_FILE)
	docker compose up --build -d

down:
	docker compose down
