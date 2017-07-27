module.exports = reduce

function reduce (list, cb, inital) {
  return wrap(list, cb, inital)
}

async function wrap (array, cb, initial) {
  let total = await (initial || array.shift())
  let iterator = list(array)
  for (let item of iterator) {
    item = await item
    total = await cb(total, item)
  }
  return total
}

function * list (value) {
  for (let item of value) {
    yield item
  }
}
