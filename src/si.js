export const si = (() => {
  const typeCheck = (elementToCheck) => {
    const stringType = Object.prototype.toString.call(elementToCheck)
    return stringType.substring(
      stringType.indexOf(' ') + 1,
      stringType.indexOf(']')
    ).toLowerCase()
  }

  const isPrimitive = (elementToCheck) => elementToCheck !== Object(elementToCheck)

  const freezeDeep = (elementToFreeze) => {
    if (typeCheck(elementToFreeze) === 'object') {
      return Object.freeze(Object.fromEntries(
        Object.keys(elementToFreeze).map(key => {
          return ([key, freezeDeep(elementToFreeze[key])])
        })
      ))
    } else if (typeCheck(elementToFreeze) === 'array') {
      return Object.freeze(elementToFreeze.map(freezeDeep))
    } else {
      return elementToFreeze
    }
  }

  const produce = (target, callback) => {
    const cloned = cloneDeep(target)
    if (callback === undefined) return cloned
    callback(cloned)
    return freezeDeep(cloned)
  }

  const cloneArray = (elementToClone) => elementToClone.map(cloneDeep)

  const cloneObject = (elementToClone) => Object.fromEntries(
    Object.keys(elementToClone).map(key => {
      return ([key, cloneDeep(elementToClone[key])])
    })
  )

  const cloneMap = (elementToClone) => {
    const clonedMap = new Map()
    elementToClone.forEach((value, key) => {
      clonedMap.set(key, cloneDeep(value))
    })
    return (clonedMap)
  }

  const cloneSet = (elementToClone) => {
    const clonedSet = new Set()
    elementToClone.forEach((value) => clonedSet.add(cloneDeep(value)))
    return (clonedSet)
  }

  const cloneDeep = (element) => {  
    if (isPrimitive(element)) return element
    switch (typeCheck(element)) {
      case 'object':
        return cloneObject(element)
      case 'array':
        return cloneArray(element)
      case 'map':
        return cloneMap(element)
      case 'set':
        return cloneSet(element)
      default:
        return element
    }
  }

  return ({
    produce
  })
})()
