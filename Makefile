# ENV defaults to local (so that requirements/local.txt are installed), but can be overridden
#  (e.g. ENV=production make setup).
ENV ?= local
# PYTHON specifies the python binary to use when creating virtualenv
PYTHON ?= python3.11

# Editor can be defined globally but defaults to nano
EDITOR ?= nano

# By default we open the editor after copying settings, but can be overridden
#  (e.g. EDIT_SETTINGS=no make settings).
EDIT_SETTINGS ?= yes

# Project name
PROJECT_NAME ?= olem_landing

# Django folder name
DJANGO_FOLDER_NAME ?= olem_landing

# Get root dir and project dir
PROJECT_ROOT ?= $(CURDIR)
SITE_ROOT ?= $(PROJECT_ROOT)/$(DJANGO_FOLDER_NAME)

CUR_DIR_NAME ?= $(shell basename `pwd`)

JS_COBERTURA="app/coverage/cobertura-coverage.xml"

# Cache dirs for poetry/pip
#
# To have one big cache for all your projects just add the following to your profile:
#
# export DPT_POETRY_CACHE_DIR=/path/to/cache/pypoetry
# export DPT_PIP_CACHE_DIR=/path/to/cache/pip
#
# Note: We do not recommend to share the cache with your system pip/poetry/ruff cache as you
#        will start getting PermissionError's when interfacing with pip/poetry on your machine.
DPT_POETRY_CACHE_DIR ?= $(PROJECT_ROOT)/.data/pycache/pypoetry
DPT_PIP_CACHE_DIR ?= $(PROJECT_ROOT)/.data/pycache/pip
DPT_RUFF_CACHE_DIR ?= $(PROJECT_ROOT)/.data/pycache/ruff

BLACK ?= \033[0;30m
RED ?= \033[0;31m
GREEN ?= \033[0;32m
YELLOW ?= \033[0;33m
BLUE ?= \033[0;34m
PURPLE ?= \033[0;35m
CYAN ?= \033[0;36m
GRAY ?= \033[0;37m
COFF ?= \033[0m

.PHONY:
all: help


.PHONY:
help:
	@echo -e "+------<<<<                                 Configuration                                >>>>------+"
	@echo -e ""
	@echo -e "PROJECT_ROOT: $(PROJECT_ROOT)"
	@echo -e "SITE_ROOT: $(SITE_ROOT)"
	@echo -e ""
	@echo -e "+------<<<<                                     Tasks                                    >>>>------+"
	@echo -e ""
	@grep --no-filename -E '^[a-zA-Z_%-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo -e ""



# NOTE:
# As node doesn't depend on any service, we can run prettier
#  directly from the node container with docker compose
.PHONY:
run-prettier:
	@docker compose run --rm node $(cmd)


.PHONY:
prettier-check:
	@make run-prettier cmd="yarn prettier-check $(cmd)"


.PHONY:
prettier-check-all:
	@make run-prettier cmd="yarn prettier-check-all $(cmd)"


.PHONY:
prettier-format:
	@make run-prettier cmd="yarn prettier-format $(cmd)"


.PHONY:
prettier-format-cut-prefix:
	@make run-prettier cmd="yarn prettier-format $(subst app/src, src, $(cmd))"


.PHONY:
prettier-format-all: ## Format JavaScript code with Prettier
	@make run-prettier cmd="yarn prettier-format-all $(cmd)"


.PHONY:
docker: settings
	@docker compose down --remove-orphans
	@docker compose build
	@docker compose up -d
	@docker compose logs -f


.PHONY:
setup: pycharm settings ## Sets up the project in your local machine. This includes copying PyCharm files, creating local settings file, and setting up Docker
	@echo -e "$(CYAN)Creating Docker images$(COFF)"
	@docker compose build
	@echo -e "$(CYAN)Installing node modules$(COFF)"
	@make node-install

#	@echo -e "$(CYAN)Extracting JS translations$(COFF)"
#	@make extract-i18n

	@echo -e "$(CYAN)===================================================================="
	@echo -e "SETUP SUCCEEDED"
	@echo -e "Run 'make docker' to start Django development server and Webpack.$(COFF)"


.PHONY:
pycharm: $(PROJECT_ROOT)/.idea ## Copies default PyCharm settings (unless they already exist)


$(PROJECT_ROOT)/.idea:
	@echo -e "$(CYAN)Creating pycharm settings from template$(COFF)"
	@mkdir -p $(PROJECT_ROOT)/.idea && cp -R $(PROJECT_ROOT)/.idea_template/* $(PROJECT_ROOT)/.idea/


$(PROJECT_ROOT)/.env:
	@echo -e "$(CYAN)Copying .env file$(COFF)"
	@cp -n $(PROJECT_ROOT)/.env.example $(PROJECT_ROOT)/.env


.PHONY:
settings: $(PROJECT_ROOT)/.env


.PHONY:
coverage-js:
	@echo -e "$(CYAN)Running automatic code coverage check$(COFF)"
	@docker compose run --rm node yarn test --coverage $(cmd)


.PHONY:
patch-coverage-js-paths:  ## Updates the paths in JS cobertura report to make it work with Gitlab
	sed -i -e "s|<source>../</source>| |" ${JS_COBERTURA}
	sed -i -e "s|<sources>| |" ${JS_COBERTURA}
	sed -i -e "s|</sources>| |" ${JS_COBERTURA}


.PHONY:
node-install:
	@docker compose run --rm node yarn


.PHONY:
node-audit:
	@docker compose run --rm node npm fund

.PHONY:
node-audit-fix:
	@docker compose run --rm node npm audit fix

.PHONY:
node-manage:
	@docker compose run --rm node $(cmd)

.PHONY:
test-node-watch: clean
	@docker compose run --rm node yarn test -- --watchAll

.PHONY:
node-build:
	@docker compose run --rm node yarn build


.PHONY:
test-js: clean
	@echo -e "$(CYAN)Running automatic node.js tests$(COFF)"
	@docker compose run --rm node yarn test $(cmd)

.PHONY:
test-node: test-js

.PHONY:
#lint-js: prettier-check-all eslint node-typecheck stylelint
lint-js: prettier-check-all eslint stylelint

.PHONY:
lint: lint-js

.PHONY:
quality: lint

.PHONY:
fmt-js: eslint-fix prettier-format-all

.PHONY:
fmt: fmt-js

# Aliases to format commands
.PHONY:
fix: fmt

.PHONY:
format: fmt


.PHONY:
eslint:
	@echo -e "$(CYAN)Running ESLint$(COFF)"
	@docker compose run --rm node yarn lint

.PHONY:
node-typecheck:
	@echo "$(CYAN)Running Node Typecheck(COFF)"
	@docker compose run --rm node yarn lint:tsc $(cmd)


.PHONY:
eslint-fix:
	@echo -e "$(CYAN)Running ESLint$(COFF)"
	@docker compose run --rm node yarn lintfix


.PHONY:
stylelint:
	@echo -e "$(CYAN)Running StyleLint$(COFF)"
	@docker compose run --rm node yarn stylelint


.PHONY:
node-shell:
	docker compose run --rm node bash


.PHONY:
node-fix-ownership:
	@docker compose run --rm node chown -R `id -u`:`id -g` ./


.PHONY:
docker-logs:
	docker compose logs -f


.PHONY:
extract-i18n:
	docker compose run --rm node yarn extract-i18n
