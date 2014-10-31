# Node.js Server Boilerplate

This is a node.js server boilerplate running express for serving and using AngularJS for frontend. SCSS is used as css preprocessor.

------

### Frontend

The frontend is stored in `core/client` with all code stored in `core/client/assets/`. CSS is using sass and scss as preprocessor. Browserify is used for javascript development.

The frontend libs is using bower to install and grunt to compile and watch changes.

### Backend

The backend can be found at `core/server`. There is a client controller which redirects to `'/'` to load a main page with the initial angular app called **main**. The view rendering is using ejs.

The server got an api path predefined at `/api` and can be edited at `core/server/routes/api`. 

#### Generic

This backend is using Promises to suppress deep nesting of callbacks. Read more at [bluebird](https://github.com/petkaantonov/bluebird).

-----

Note: *No data store is used by default*

### Tests

Tests is using mocha and expect.js for value assurance.

-----

## Install

**Warning:** make sure to have SASS installed before starting project. Read more at [sass-lang.com](http://sass-lang.com/)

```sh

$ npm install
$ npm install grunt-cli -g
$ npm install mocha -g // For tests

```

## Starting

Running this command will automatically install bower components and compile JavaScript and CSS.

```
$ grunt 
```

## Only start server

```sh
$ npm start
```

## Run tests
```sh
$ npm test
```

# TODO

* [ ] Make build script
* [ ] Add a default datastore?
* [ ] Better browserify build to require jQuery?