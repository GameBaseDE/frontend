# GameBase - Frontend
[![Bugs](https://sonarqube.gahr.dev/api/project_badges/measure?project=GB-F&metric=bugs)](https://sonarqube.gahr.dev/dashboard?id=GB-F)
[![Coverage](https://sonarqube.gahr.dev/api/project_badges/measure?project=GB-F&metric=coverage)](https://sonarqube.gahr.dev/dashboard?id=GB-F)
[![Maintainability Rating](https://sonarqube.gahr.dev/api/project_badges/measure?project=GB-F&metric=sqale_rating)](https://sonarqube.gahr.dev/dashboard?id=GB-F)
[![Quality Gate Status](https://sonarqube.gahr.dev/api/project_badges/measure?project=GB-F&metric=alert_status)](https://sonarqube.gahr.dev/dashboard?id=GB-F)
[![Security Rating](https://sonarqube.gahr.dev/api/project_badges/measure?project=GB-F&metric=security_rating)](https://sonarqube.gahr.dev/dashboard?id=GB-F)
[![Vulnerabilities](https://sonarqube.gahr.dev/api/project_badges/measure?project=GB-F&metric=vulnerabilities)](https://sonarqube.gahr.dev/dashboard?id=GB-F)
[![Angular Badge](https://img.shields.io/badge/Made%20with-Angular%20-red.svg)](https://dev.game-base.de)
[![No Bugs Badge](https://img.shields.io/badge/Definitely%20-no%20bugs%20%3A%29-red.svg)](https://dev.game-base.de)

This is the frontend component of our software. It allows game server management, such as creating, starting, stopping and restarting containers.

# Installation
The latest version is always published to docker hub.
1. Pull the image with `docker pull gamebaseproject/frontend`
2. Run the image with `docker run --restart unless-stopped -d -p 8080:80 -e API_ROOT_URL="https://myapi.com" gamebaseproject/frontend`

Or use it within a *docker-compose.yml*:
```yaml
version: '3'
services:
  angular:
    image: gamebaseproject/frontend
    restart: unless-stopped
    ports:
      - 8080:80
    environment:
      - API_ROOT_URL=https://myapi.com
```

# Angular related stuff
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
