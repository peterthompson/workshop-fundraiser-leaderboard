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

## 9. Making API calls

We are going to use the JustGiving platform for our data.

Create an account on [JustGiving Developer](https://developer.justgiving.com/) to obtain an `appId`.

Choose a `charityId` from one of the charities below.

| Charity                                                                       | ID     |
|-------------------------------------------------------------------------------|--------|
| [British Heart Foundation](https://www.justgiving.com/britishheartfoundation) | 183092 |
| [Macmillan Cancer Support](https://www.justgiving.com/macmillan)              | 2116   |
| [Cancer Research UK](https://www.justgiving.com/cancerresearchuk)             | 2357   |
| [Oxfam](https://www.justgiving.com/oxfam)                                     | 13441  |
| [National Trust](https://www.justgiving.com/nationaltrust)                    | 183560 |
| [Save the Children](https://www.justgiving.com/savethechildren)               | 18570  |

The endpoint for our data is `https://api.justgiving.com/{appId}/v1/charity/{charityId}/leaderboard`

Use a tool such as [Postman](https://www.getpostman.com) to retrieve an example response from this endpoint.

Notice that the format of the response is XML. Add a `'Content-Type'` header value of `'application/json'` to change the response format to JSON.

Create an `api` directory inside the `src` directory.

Create a `__data__` directory inside the `api` directory.

Create a `fundraisers.json` file with the body of the endpoint response.

We are going to use this data for testing our network calls so truncate the `pages` array in the `fundraisers.json` file to just a few items in order to make our tests a bit more concise.

We should have a fairly good idea what we are doing here, so a TDD approach is appropriate.

Let us start by defining the interface for our api.

Create an `index.js` file inside the `api` directory.

```javascript
export const appId = 'put_your_appId_here';
export const charityId = 'put_your_charityId_here';
export const baseUrl = 'https://api.justgiving.com';
export const fundraisersPath = `/${appId}/v1/charity/${charityId}/leaderboard`;

export function fetchFundraisers() {}
```

Next we can write out tests.

Install `nock` to mock the external endpoint.

```bash
npm install --save-dev nock
```

Create a `__tests__` directory inside the `api` directory.

Create an `index.test.js` file inside the `__tests__` directory.

```javascript
import nock from 'nock';
import { fetchFundraisers, baseUrl, fundraisersPath } from '../';

const fundraisers = [
  { amount: 37104.00, name: 'Campbell Josephine and Libby Naylor' },
  { amount: 28827.83, name: 'Jenny payne' },
  { amount: 17350, name: 'Simon Gillespie' },
];

describe('fetchFundraisers', () => {
  describe('when data is available', () => {
    beforeAll(() => {
      nock(baseUrl)
        .get(fundraisersPath)
        .replyWithFile(200, __dirname + '/../__data__/fundraisers.json');
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('returns a list of fundraisers', () => {
      return fetchFundraisers()
        .then(fundraisers => expect(fundraisers).toEqual(fundraisers));
    });
  });

  describe('when data is unavailable', () => {
    beforeAll(() => {
      nock(baseUrl)
        .get(fundraisersPath)
        .reply(404);
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('returns an error', () => {
      return fetchFundraisers()
        .catch(err => expect(err).toEqual(Error('Data Unavailable')));
    });
  });
});
```

Run the tests.

```bash
npm run test
```

We now have some failing tests to fix.

Install `isomorphic-fetch`, but note that we can use almost any AJAX library for our service calls.

```bash
npm install --save isomorphic-fetch
```

Update the `index.js` file inside the `api` directory to fix the tests.

```javascript
import fetch from 'isomorphic-fetch';

export const appId = 'put_your_appId_here';
export const charityId = 'put_your_charityId_here';
export const baseUrl = 'https://api.justgiving.com';
export const fundraisersPath = `/${appId}/v1/charity/${charityId}/leaderboard`;

export function fetchFundraisers() {
  return fetch(baseUrl + fundraisersPath, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(errorHandler)
    .then(res => res.json())
    .then(res => res.pages)
    .then(pages => pages.map(page => ({
      amount: page.amount.toFixed(2),
      name: page.owner
    })));
}

function errorHandler(res) {
  if (!res.ok) {
    throw Error('Data Unavailable');
  }
  return res;
}
```

Run the tests again.

```bash
npm run test
```

They should now be passing.

**tag:** `09-making-api-calls`

## 10. Mocking our API

We are going to want to use the api we just created inside our `Fundraiser` component. When we write our unit tests for this component we will want to isolate it from our api implementation and avoid unnecessary coupling.

To do this we will create a mock of our api which can be used elsewhere.

Create a `__mocks__` directory inside the `api` directory.

Create an `index.js` file inside the `__mocks__` directory.

```javascript
let response = null;

export function setResponse(res) {
  response = res;
}

export function fetchFundraisers() {
  return new Promise((resolve, reject) => {
    process.nextTick(() => response instanceof Error ? reject(response) : resolve(response));
  });
}
```

The mock implementation is fairly crude, but it will do for `Fundraisers` component unit tests.

Notice the use of `process.nextTick()`. Our fetch request is asynchronous, we can mimic this by resolving the promise on the next cycle of the event loop i.e. the next tick.

Are you wondering [what the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ).

**tag:** `10-mocking-our-api`

## 11. Implementing our Fundraising component

Continuing the TDD approach, let us create the tests for the `Fundraising` component.

Install `enzyme` and `react-addons-test-utils`.

```bash
npm install --save-dev enzyme react-addons-test-utils
```

Create a `Fundraisers.test.js` file inside the `components/__tests__` directory.

```javascript
jest.mock('../../api');
jest.useFakeTimers();

import React from 'react';
import { mount } from 'enzyme';
import { fetchFundraisers, setResponse } from '../../api';
import Fundraisers from '../Fundraisers';

const fundraisers = [
  { amount: 37104.00, name: 'Campbell Josephine and Libby Naylor' },
  { amount: 28827.83, name: 'Jenny payne' },
  { amount: 17350, name: 'Simon Gillespie' },
];

describe('Fundraisers', () => {
  describe('when data is available', () => {
    it('renders a list of fundraisers', () => {
      setResponse(fundraisers);

      const component = mount(<Fundraisers />);

      expect(component.text()).toBe('Loading…');

      jest.runAllTicks(() => {
        fundraisers.forEach(fundraiser => {
          expect(component.text()).toContain(fundraiser.name);
          expect(component.text()).toContain(fundraiser.amount);
        })
      });
    });
  });

  describe('when data is unavailable', () => {
    it('renders the text "Data Unavailable"', () => {
      setResponse(Error('Data Unavailable'));

      const component = mount(<Fundraisers />);

      expect(component.text()).toBe('Loading…');

      jest.runAllTicks(() => {
        expect(component.text()).toBe('Data Unavailable');
      });
    });
  });
});
```

We are introducing a lot of new concepts in this one file, take some time to go through it.

Notice the use of `jest.runAllTicks()`. Our `Fundraisers` component will contain several asynchronous operations, so we have to ensure that it is has finished before asserting on the rendered output.

Notice the use of `forEach` to generate expectations. If you have a lot of assertions or tests that are similar then this 'roll-up' technique is useful for making your tests easier to maintain.

We are relying on our api mock implementation heavily throughout these tests. You can see that the `api` module is rewired at the top of the file `jest.mock('../../api')`.

Finally let us finish the `Fundraiser` component implementation.

Install `lodash.uniqueid`, we are going to need it to generate unique keys.

```bash
npm install --save lodash.uniqueid
```

Update the `Fundraiser.js` file to get the tests passing.

```javascript
import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import { fetchFundraisers } from '../api';

class Fundraisers extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      fundraisers: null,
      isError: false,
    };
  }

  componentDidMount() {
    fetchFundraisers()
      .then(fundraisers => {
        this.setState({
          isLoading: false,
          fundraisers,
          isError: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          fundraisers: null,
          isError: true,
        });
      })
  }

  render() {
    const { isLoading, fundraisers, isError, } = this.state;

    if (isError) return (<div>Data Unavailable</div>);

    if (isLoading) return (<div>Loading&hellip;</div>);

    return (
      <div>
        <ol>
          { fundraisers.map(({ name, amount }) => (
            <li key={uniqueId()}>&pound;{amount} - {name}</li>
          )) }
        </ol>
      </div>
    );
  }
}

export default Fundraisers;
```

**tag:** `11-implementing-our-fundraisers-component`

## 12. That's all folks!

We have covered,

* Bundling an application with [Webpack](https://webpack.js.org)
* Transpiling code with [Babel](https://babeljs.io)
* Creating UI components with [React.js](https://facebook.github.io/react)
* Testing an application with [Jest](https://facebook.github.io/jest)

**tag:** `12-thats-all-folks`
