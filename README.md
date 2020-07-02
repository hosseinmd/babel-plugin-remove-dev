[![NPM](https://nodei.co/npm/babel-plugin-remove-dev.png)](https://nodei.co/npm/babel-plugin-remove-dev/)

[![install size](https://packagephobia.now.sh/badge?p=babel-plugin-remove-dev)](https://packagephobia.now.sh/result?p=babel-plugin-remove-dev)
[![dependencies](https://david-dm.org/hosseinmd/babel-plugin-remove-dev.svg)](https://david-dm.org/hosseinmd/babel-plugin-remove-dev.svg)

# babel-plugin-remove-dev

This plugin removes codes that do not run in the production environment. like `if(__DEV__){console.log("log")}`
The base goal of this plugin is reduce production source code

## TOC

- [Installation](#Installation)
- [Examples](#Examples)

## Installation

2. Install babel-plugin-remove-dev

```npm
npm i --save-dev babel-plugin-remove-dev
```

```yarn
yarn add --dev babel-plugin-remove-dev
```

### Usage

#### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "env": {
    "production": {
      "plugins": ["remove-dev"]
    }
  }
}
```

#### Via CLI

```sh
$ babel --plugins remove-dev script.js
```

#### Via Node API

```js
require("babel-core").transform("code", {
  plugins: ["remove-dev"],
});
```

## Examples

```js
const test = "test";
if (process.env.NODE_ENV !== "production") {
  console.log(test);
}

// Compile to

const test = "test";
```

Global `__DEV__`

```js
const test = "test";
if (__DEV__) {
  console.log(test);
}

// Compile to

const test = "test";
```
