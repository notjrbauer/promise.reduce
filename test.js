var test = require('blue-tape')
var reduce = require('./')

test('reduces empty set', (t) => {
  let given = 'abc'
  let expected = 'abc'
  let identity = (a) => a

  return reduce([], identity, given)
    .then((r) => {
      t.equals(r, expected)
    })
})

test('reduces when promise is a reducer function', (t) => {
  let given = ['a', 'b', 'c']
  let expected = 'abc'
  let result = reduce(given, reducer)

  function reducer (total, cur) {
    return new Promise((resolve, reject) => {
      return resolve(total + cur)
    })
  }

  return result.then((r) => {
    t.equals(r, expected)
  })
})

test('reduces when list contains promises', (t) => {
  let given = [
    Promise.resolve('a'),
    Promise.resolve('b'),
    Promise.resolve('c')
  ]

  function reducer (total, cur) {
    return total + cur
  }

  let expected = 'abc'
  let result = reduce(given, reducer)

  return result.then((r) => {
    t.equals(r, expected)
  })
})

test('reduce throws', (t) => {
  let given = [
    Promise.resolve('a'),
    Promise.resolve('b'),
    Promise.resolve('c')
  ]

  function reducer (total, cur) {
    throw new Error('Forced Error')
  }

  return reduce(given, reducer)
    .then(t.notOk)
    .catch(t.ok)
})

test('reduce rejects', (t) => {
  let given = [
    Promise.resolve('a'),
    Promise.reject(new Error('Forced Error')),
    Promise.resolve('c')
  ]

  function reducer (total, cur) {
    return total + cur
  }

  let result = reduce(given, reducer)

  return result
    .then(t.notOk)
    .catch(t.ok)
})
