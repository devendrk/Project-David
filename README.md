## **CRUD API (Project David)**

## Quick Start

```shell
# install deps
npm install

# run in development mode
npm run dev
or
npm start
```

## Customer Endpoints

Endpoints for viewing and manipulating customers

- Show Customer: `GET /customers/`
- Show single Customer : `GET /customers/:id`
- create Customer : `POST /customers/`
- update Customer : `PUT /customers/:id`
- delete Customer : `DELETE /customers/:id`
  note: id must be integer

## Persons Endpoints

endpoints for viewing and manipulating persons that is created by a customer.

- Show persons: `GET /:customer-id/persons/`
- Show single person : `GET /persons/:id`
- create a person : `POST /persons/`
- update a person : `PUT /persons/:id`
- delete a person : `DELETE /persons/:id`
