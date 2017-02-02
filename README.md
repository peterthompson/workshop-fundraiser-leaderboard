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