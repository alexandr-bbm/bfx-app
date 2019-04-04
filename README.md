# bfx app

This application represents several widgets from [bitfinex public demo](https://www.bitfinex.com/trading) 
and uses [bitfinex piblic api](https://docs.bitfinex.com/docs/ws-public).

It was implemented during 8-hour coding challenge with consequent improvements (2 more hours)

You can see the requirements in `./requrements.md`

# How to start

`npm i`

`npm start`

# Project structure

Project is designed to have extensible architecture.

- `src/core` -- core functionality used by the rest of the application. 
- `src/features` -- reasonably self-contained features, each might include both React components and Redux actions, reducers, and selectors for state management.
- `src/pages` -- page components (with routes in more real-world application). They usually use components from features, or shared components.
- `src/services` -- services used throughout the application.
- `src/shared` -- shared components and helper function

# Project techs

* React + Redux (redux-thunk)
* styled components (primary styling tool), SASS (specific cases).
