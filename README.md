# Glowjob

* [Glowjob](#glowjob)
  * [Description](#description)
  * [Project structure](#project-structure)
  * [Understanding the project](#understanding-the-project)
    * [API auto-generated client](#api-auto-generated-client)
    * [CLI commands](#cli-commands)
  * [Requirements](#requirements)
    * [Initialize the project](#initialize-the-project)
  * [Usage](#usage)
    * [API](#api)
      * [Before starting the server](#before-starting-the-server)
      * [Start the server](#start-the-server)
      * [Generate the OpenAPI's server definitions](#generate-the-openapis-server-definitions)
    * [Web](#web)
      * [Start in dev mode](#start-in-dev-mode)
      * [Build](#build)
      * [Serve the build](#serve-the-build)
    * [OpenApi](#openapi)
      * [Generate client](#generate-client)

## Description

Monorepo for the glowjob project.

## Project structure

``` bash
/
├── apps 
│   ├── api # Spring boot api
│   └── web # React web app powered by vite
└── libs
    ├── ui # Common UI components, hooks and utils
    ├── theme # Centralized Chakra-UI theme for all components
    └── openapi # OpenAPI schema for API and auto-generated client services and typescript models
```

## Understanding the project

### API auto-generated client

The front-end http client is auto-generated from the API OpenAPI schema using [openapi-codegen](https://github.com/fabien0102/openapi-codegen).
The codegen is run in 3 different situations :
- Each time a `.java` file is modified and saved in the `api` app source code.
- Each time the `web` app is build.
- On demand with the `nx run openapi:generate` command.

This ensures that the client is always up to date with the API.

The output of the codegen is located in `libs/openapi/src/generated` and the openapi specification is located in `libs/openapi/src/openapi.yaml`.

Concretly, the codegen generates :
- `apiSchemas.ts`: all the typescript models synced on the request input and response data output of the api controllers.
- `apiComponents.ts`: `@tanstack/query` (previously `react-query`) hooks for each API endpoint their associated fetch functions for classic async/await calls.
- `apiFetcher.ts`: the `fetcher` function used by `@tanstack/query` to make the actual http calls, which is completely customizable and won't be overwritten by the codegen.

### CLI commands

In addition to classic `nx` generators commands, the project have additionnal commands to help with development by generating different type of files:
- `pnpm g:web`: Generate files for `apps/web`. It can generate following types of files dynamically:
    - `component`: Generate a component.
    - `page`: Generate a page.
- `pnpm g:ui`: Generate files for `libs/ui`. It can generate following types of files dynamically:
    - `component`: Generate a component with a storybook story.

## Requirements

- [Node.js](https://nodejs.org/en/) (>=20)

### Initialize the project

1. Install Node dependencies
    ```bash
    npm install --legacy-peer-deps
    ```
2. Install `nx` globally
    ```bash
    npm install -g nx
    ```
3. Install Java dependencies
    ```bash
   mvn -f apps/api/pom.xml dependency:resolve
   ```

## Usage

### API

#### Before starting the server
Launch the Docker Compose stack used by the API

```bash
docker compose -f infra/docker/compose.yml up -d
```

#### Start the server
```bash
mvn -f apps/api/pom.xml spring-boot:run
```

#### Generate the OpenAPI's server definitions
Be sure to launch the API before generating the definitions
```bash
mvn -f apps/api/pom.xml springdoc-openapi:generate
```

### Web

#### Start in dev mode
```bash
nx run web:dev
```

#### Build
```bash
nx run web:build
```

#### Serve the build
```bash
nx run web:preview
```

### OpenApi

#### Generate client
```bash
nx run openapi:generate
```
