<p align="center">
  <img src="./docs/_images/logo.svg" width="150" alt="Mustodon" />
</p>

# Mustodon &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Mustodon is a to do list example DDD + CQRS + ES application.

## Installation

- Install dependencies with your favourite package manager with `npm install` or `yarn`.
- Download and run containers with `docker-compose up -d`.
- Create a file named `.env` in the project root and copy the content of the `.env.example` file. You can also customize parameters as you consider.

## Usage

- You can run the app locally with `yarn start:dev`.
- Open `localhost:3000` for api client, `localhost:8081` for MongoDB views and `localhost:2113` for Event Store and use `admin` as user and `changeit` as password.

### License

Mustodon is [MIT licensed](./LICENSE).
