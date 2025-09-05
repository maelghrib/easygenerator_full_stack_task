ENV_FILE_BACKEND = ./backend/.env
ENV_FILE_FRONTEND = ./frontend/.env.local

default: up

$(ENV_FILE_BACKEND):
	@echo "MONGODB_URI=mongodb://mongodb_container:27017/easygenerator_backend_db" > $(ENV_FILE_BACKEND)
	@echo "JWT_ACCESS_SECRET=supersecretaccess" >> $(ENV_FILE_BACKEND)
	@echo "JWT_ACCESS_EXPIRES_IN=15m" >> $(ENV_FILE_BACKEND)
	@echo "$(ENV_FILE_BACKEND) created with default values."

$(ENV_FILE_FRONTEND):
	@echo "NEXT_PUBLIC_API_URL=http://localhost:3333" > $(ENV_FILE_FRONTEND)
	@echo "INTERNAL_API_URL=http://backend:3333" >> $(ENV_FILE_FRONTEND)
	@echo "$(ENV_FILE_FRONTEND) created with default values."

up: $(ENV_FILE_BACKEND) $(ENV_FILE_FRONTEND)
	docker compose up --build -d

down:
	docker compose down
