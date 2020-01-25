GIT_USER=warchant
GIT_REPO=lgtm-api-ts
API=https://lgtm.com/api/v1.0/openapi
CODEGEN=typescript-node
DOCGEN=html

gen:
	npx openapi-generator generate --git-user-id=$(GIT_USER) --git-repo-id=$(GIT_REPO) -i $(API) -g $(CODEGEN) -c config.json

docs:
	npx openapi-generator generate --git-user-id=$(GIT_USER) --git-repo-id=$(GIT_REPO) -i $(API) -g $(DOCGEN) -c config.json -o docs


validate:
	npx openapi-generator validate -i $(API)

all: $(gen)
