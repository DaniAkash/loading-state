<div align="center">

# 📶 Loading State 🔄

Build UX friendly loading indicators by maintaining a **"loading state"** 🤗

[![Build Status][build-badge]][build]
[![Maintainability][maintainability-badge]][maintainability-url]
[![Test Coverage][coverage-badge]][coverage-url]

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]
[![Bundlephobia][bundle-phobia-badge]][bundle-phobia]

[![Star on GitHub][github-star-badge]][github-star]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Twitter Follow][twitter-badge]][twitter]

---

### PRs Welcome 👍✨

</div>

- 📦 [Installation](#installation)
- ℹ️ [Usage](#usage)
- 👨🏽‍🏫 [Tutorial](#tutorial)
- 💡 [Examples](#examples)
- 🏎 [Performance](#performance)

## Motivation

Displaying loading indicators while making an AJAX network request provides different UX for users with varying network speeds. Users in high speed internet connect often see a few 100ms flash of loading indicator, while users on slow network needs to deal with the loading indicators for more than 1000ms+

Hence loading-state provides a way to manage the loading state of the network requests (or any promises in general) with a simple easy to use API

- Read my [tweet thread](https://twitter.com/dani_akash_/status/1247617443897290752) for full details of my motivation to build this library (or try [thread reader](https://threadreaderapp.com/thread/1247617443897290752.html) version)
- Read my [Dev.to](https://dev.to/dani_akash_/ux-friendly-loading-indicators-3obd) post for usage details with live example.

## Installation

```sh
yarn add loading-state

# or

npm i loading-state
```

## Usage

```js
import loader from "loading-state";

loader(
  new Promise((resolve, reject) => resolve("cool!")),
  {
    shortLoading: () => {}, // callback to display first loading indicator
    longLoading: () => {}, // callback to display the second indicator
    done: (result) => {}, // success callback with the result of the promise
    error: (e) => {}, // error callback with the thrown error
  },
  {
    busyDelayMs: 300, // how long to wait till displaying first indicator
    longBusyDelayMs: 1000, // how long to wait till displaying second indicator
    shortIndicatorVisibilityMs: 300, // how long to display first indicator
    longIndicatorVisibilityMs: 300, // how long to display second indicator
  }
);
```

### API ﹣

```js
loader(promise, callbacks?, timeConfig?)
```

#### promise: `Promise<T>`

A promise that needs to be resolved by the loader

#### callbacks

```ts
interface ICallbacks<T> {
  shortLoading?: () => any;
  longLoading?: () => any;
  done?: (arg: T) => any;
  error?: (arg: Error) => any;
}
```

A set of callback that will be executed while resolving the given promise.

The result of the promise will be available in the `done` callback.

The other two callbacks `shortLoading` & `longLoading` are used to display loading indicators.

#### timeConfig

```ts
interface ITimeConfig {
  busyDelayMs?: number; // default 300
  longBusyDelayMs?: number; // default 1000
  shortIndicatorVisibilityMs?: number; // default 300
  longIndicatorVisibilityMs?: number; // default 300
}
```

## Examples

- [Loading Quote of the day][qotd-example]

## Licenses

MIT © [DaniAkash][twitter]

[qotd-example]: https://codesandbox.io/s/loading-state-b8o5z
[build]: https://github.com/DaniAkash/loading-state/actions
[build-badge]: https://github.com/daniakash/loading-state/workflows/build/badge.svg
[coverage-badge]: https://api.codeclimate.com/v1/badges/462311091a0ea368cec5/test_coverage
[coverage-url]: https://codeclimate.com/github/DaniAkash/loading-state/test_coverage
[maintainability-badge]: https://api.codeclimate.com/v1/badges/462311091a0ea368cec5/maintainability
[maintainability-url]: https://codeclimate.com/github/DaniAkash/loading-state/maintainability
[bundle-phobia-badge]: https://badgen.net/bundlephobia/minzip/loading-state
[bundle-phobia]: https://bundlephobia.com/result?p=loading-state
[downloads-badge]: https://img.shields.io/npm/dm/loading-state.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/loading-state
[package]: https://www.npmjs.com/package/loading-state
[version-badge]: https://img.shields.io/npm/v/loading-state.svg?style=flat-square
[twitter]: https://twitter.com/dani_akash_
[twitter-badge]: https://img.shields.io/twitter/follow/dani_akash_?style=social
[github-watch-badge]: https://img.shields.io/github/watchers/DaniAkash/loading-state.svg?style=social
[github-watch]: https://github.com/DaniAkash/loading-state/watchers
[github-star-badge]: https://img.shields.io/github/stars/DaniAkash/loading-state.svg?style=social
[github-star]: https://github.com/DaniAkash/loading-state/stargazers
