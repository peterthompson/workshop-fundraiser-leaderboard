# Workshop Fundraiser Leaderboard

The aim of this workshop is to provide an introduction to authoring and testing React.js applications.

We will cover,

* Bundling an application with [Webpack](https://webpack.js.org)
* Transpiling code with [Babel](https://babeljs.io)
* Creating UI components with [React.js](https://facebook.github.io/react)
* Testing an application with [Jest](https://facebook.github.io/jest)

We will build an application that shows the top 10 fundraisers for a given charity on the [JustGiving](http://www.justgiving.com) platform.

## 1. Setting up our project

In an appropriate location on your system create the project.

```bash
mkdir fundraiser-leaderboard
cd fundraiser-leaderboard

npm init -y

git init

echo '# Fundraiser Leaderboard' > README.md
```

**tag:** `01-setting-up-our-project`

## 2. Our first React component

Install `react` and `react-dom`.

```bash
npm install --save react react-dom
```

Add `node_modules` to a `.gitignore` file in the root of our project.

```
# dependencies
node_modules
```

Create a `src` directory in the root of our project.

Create our first React component called `index.js` in the `src` directory.

```javascript
import React from 'react';
import { render } from 'react-dom';

render(
  <div>Hello World</div>,
  document.getElementById('root'),
);
```

**tag:** `02-our-first-react-component`

## 3. Creating our index.html

Create an `index.html` file in the `src` directory.

```html
<!doctype HTML>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fundraiser Leaderboard</title>
  </head>
  <body>
  <div id="root"></div>
  </body>
</html>
```

[Learn more about the document head](https://github.com/joshbuchea/HEAD).

**tag:** `03-creating-our-index`

## 4. Setting up Webpack and Babel

Install `babel-core` and the presets `babel-preset-latest` to transpile the latest version of ECMAScript, and `babel-preset-react` to transpile JSX.

```bash
npm install --save-dev babel-core babel-preset-latest babel-preset-react
```

Next install `webpack`, `webpack-dev-server` and `html-webpack-plugin`.

```bash
npm install --save-dev webpack@^2.2.1 webpack-dev-server html-webpack-plugin
```

To use Babel to transpile JavaScript files inside Webpack we will need `babel-loader`.

```bash
npm install --save-dev babel-loader
```

Create a `.babelrc` file in the project root.

```json
{
  "presets": [ "latest", "react" ]
}
```

Create a `webpack.config.js` file also in the project root.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: 'dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

We can now use Webpack to build our application.

```bash
./node_modules/.bin/webpack
```

Notice that a `dist` directory has been created. Add this to the `.gitignore`.

```
# dependencies
node_modules

# builds
dist
```

We can also use webpack-dev-server to both build and serve our application.

```bash
./node_modules/.bin/webpack-dev-server
```

Open the application at [http://localhost:8080](http://localhost:8080).

**tag:** `04-setting-up-webpack-and-babel`

## 5. npm scripts

Instead of using the `node_modules/.bin` directory let us add some npm scripts.

Add a `start` and `build` script to the `package.json` file.

```json
...
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

We can now use these scripts to build the application,

```bash
npm run build
```

and to start the application with webpack-dev-server

```bash
npm start
```

Notice how the dist directory is never cleared between builds. Let's fix that.

Install `rimraf`.

```bash
npm install --save-dev rimraf
```

Add a `clean` script to `package.json` file that uses `rimraf` to clean the `dist` directory. Update the `build` script to ensure that `clean` is called first.

```json
...
"scripts": {
  "clean": "rimraf dist",
  "start": "webpack-dev-server",
  "build": "npm run clean && webpack",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

**tag:** `05-npm-scripts`

## 6. Production builds

Notice the size of the `bundle.js` file. It is not optimised for production.

Use webpack's default production settings to create an optimised `bundle.js` file.

```bash
./node_modules/.bin/webpack -p
```

Add an npm script for `build:prod`.

```json
...
"scripts": {
  "clean": "rimraf dist",
  "start": "webpack-dev-server",
  "build": "npm run clean && webpack",
  "build:prod": "npm run clean && webpack -p",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

**tag:** `06-production-builds`

## 7. Creating our project structure

Here we will create the skeleton of our project.

Create a `components` directory inside the `src` directory.

Inside the `components` directory create a `Fundraisers` component.

```javascript
import React, { Component } from 'react';

class Fundraisers extends Component {
  render() {
    return (<div>Loading&hellip;</div>);
  }
}

export default Fundraisers;
```

In the same directory create an `App` component.

```javascript
import React from 'react';
import Fundraisers from './Fundraisers';

const App = () => (
  <div>
    <h1>Fundraiser Leaderboard</h1>
    <Fundraisers />
  </div>
);

export default App;
```

Update our first React component (`index.js`) to include our new `App` component.

```javascript
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(
  <App />,
  document.getElementById('root'),
);
```

**tag:** `07-creating-our-project-structure`

## 8. Snapshot testing

The `App` component is relatively simple and a good candidate for snapshot testing.

Install `jest` and `react-test-renderer`.

```bash
npm install --save-dev jest react-test-renderer
```

Create a `__tests__` directory inside the `components` directory.

Inside the `__tests__` directory create an `App.test.js` file.

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('App', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
```

Add an npm script for `test`.

```json
...
"scripts": {
  "clean": "rimraf dist",
  "start": "webpack-dev-server",
  "build": "npm run clean && webpack",
  "build:prod": "npm run clean && webpack -p",
  "test": "jest"
},
...
```

The first time we run our snapshot test, a snapshot will be created. The subsequent times will use this snapshot to detect changes.

```bash
npm run test
```

**tag:** `08-snapshot-testing`