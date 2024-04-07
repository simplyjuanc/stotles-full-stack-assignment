# Stotles work sample assignment

## Notes from Juan Vásquez

### General

Besides the different tasks in the assessment, I've primarily:

- Introduced some Separation of Concerns (primarily in the server) following an MVC model.
- Changed the raw queries in the data models to a programmatic access for better security and type-integrity
- Added a debouncer in the RecordSearchPage to decrease the number of server calls,

### Future Work

With more time available, I would have introduced the changes below.

#### Performance Improvements

- Unit testing with Vitest or React Testing Library to improve code confidence and development speed.
- Separated the filters into multiple components for reusability.
- Migrated to React Query to reduce the number of useEffects and other hooks used.
- Fuzzy search for the text query.
- If there's no need to keep the data up-to-date reactively, and depending on the number of records in the DB, I would probably move the entire logic to the client and call Records and Buyers only once. If we wanted to make this a scalable service, I would not introduce that change.

#### UI/UX Improvements

- Introduce elements to give feedback to the user: loader/spinner, sorting options for the table, additional filters (see point above on component reusability), additional columns (e.g. country in the buyer data), a toaster for unsuccessful requests (e.g. with 0 records or buyers)..
- Make the wall of tenders 1) actionable by adding links or contact numbers for the users (would imply adding one or more fields in DB, plus cascading modifications) and 2) responsive if there's a use case for it to be used on mobile.
- Add the text and buyer queries (and any other additional filters) as a query param in the URL, so it can be shared with the state already pre-selected. This would imply making changes in the BE controllers to admit this type of request.

---

## Getting started

This sample codebase consists of a separate client & server code.

It's set up in a simple way to make it as easy as possible to start making changes,
the only requirement is having recent versions of `node` & `npm` installed.

This is not a production ready configuration (nor production ready code),
it's only set up for easy development, including live reload.

To run the client bundler:

```
cd client
npm install
npm run dev
```

The processed code will be available at http://localhost:3001

To start the server:

```
cd server
npm install
npm run dev
```

The server will be available at http://localhost:3000 - the page is automatically configured
to use the assets served by vite on port 3001.

You should see something similar to this page:

![Search page](./screenshot.png)

### Disabling/Enabling TypeScript

If you prefer to completely disable TypeScript for a file, add `// @ts-nocheck` on the first line.
If on the other hand you'd like to enable strict type checking, modify `tsconfig.json` according to your needs.

Note that you can import plain JavaScript files that won't be fully typechecked.

### Browsing the database

You should start by looking at the migration in `./migrations` folder.
If you prefer to browse the DB using SQL, you can use the sqlite command line (just run `sqlite3 ./db.sqlite3`)
or any other SQL client that supports sqlite.

If for any reason the database becomes unusable, you can rebuild it using `./reset_db.sh` script`.

## The task

All the instructions are available [here](https://www.notion.so/stotles/Full-stack-software-engineer-work-sample-assignment-ae7c64e08f2a42a097d16cee4bc661fc).
