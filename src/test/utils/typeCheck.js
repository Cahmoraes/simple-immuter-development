const typeCheck = (type) => {
  const stringType = Reflect.apply(Object.prototype.toString, type, [])
  return stringType.substring(
    stringType.indexOf(' ') + 1,
    stringType.indexOf(']')
  ).toLowerCase()
}

module.exports = typeCheck