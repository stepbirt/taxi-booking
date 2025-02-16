# TaxiBookingApp

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

## Run tasks

To run the dev server for your app, use:

```sh
docker compose up
```

```sh
npm run start:all
```

To run unit test

```sh
npm run test
```

## Documents in documents folder

- OpenApi(swagger.yaml)
- System Architecture
- Database Schema Design, SQL Script

## Error Handling and Edge Cases

- Overbooking scenarios
  - Ensure a user has only one active booking at a time.
- Taxi unavailability during instant bookings.
  - Push passenger request to queue.
  - When a taxi available, assign it to first passenger queue.
- Invalid webhook data from parking lanes.
  - Add HMAC hash signatures to validate webhook payload is valid signatures.
- Network failures during notifications.
  - Implement Retry with exponential backoff.
