# promise.reduce
> "Returns a promise containing the reduced result from the provided function"


[![NPM][promise-reduce-icon]][promise-reduce-url]

## Install

```sh
$ npm install promise.reduce --save
```

## Usage

```js
var map = require('promise.reduce')
var conat = (total, current) => Promise.resolve(total + current)

reduce([
  'a',
  'b',
  Promise.resolve('c')
], concat).then((result) => {
  console.log(result) // 'abc'
})
```

## API

#### `reduce(input..., reducerFn, initialValue)` -> `promise`

Returns a promise containing the reduced result of the promisified mappingFn on its elements. Rejection occurs if any supplied promises reject.

##### input `Iterable<Promise|any>`
A sequence of promises or instanceof Iterable

##### mapperFn  `Function`
A mapping function that returns a *promise*

##### initialValue  `Function`
The initial value used in the reduction invocation


[promise-reduce-icon]: https://nodei.co/npm/promise.reduce.png?downloads=true
[promise-reduce-url]: https://npmjs.org/package/promise.reduce

