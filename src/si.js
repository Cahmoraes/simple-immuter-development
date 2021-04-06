export const si = (() => {

  const errors = new Map([
    [1, "This object has been frozen and should not be mutated"]
  ])

  const die = (errorNumber) => {
    console.log(errors.get(errorNumber))
  }

  const typeCheck = (elementToCheck) => {
    const stringType = Object.prototype.toString.call(elementToCheck)
    return stringType.substring(
      stringType.indexOf(' ') + 1,
      stringType.indexOf(']')
    ).toLowerCase()
  }

  const isPrimitive = (elementToCheck) => elementToCheck !== Object(elementToCheck)

  const freezeDeep = (elementToFreeze) => {
    switch(typeCheck(elementToFreeze)) {
      case 'object':
        return Object.freeze(Object.fromEntries(
          Object.keys(elementToFreeze).map(key => {
            return [key, freezeDeep(elementToFreeze[key])]
          })
        ))
      case 'array':
        return Object.freeze(elementToFreeze.map(freezeDeep))
      case 'set':
        elementToFreeze.add = function () { die(1) }
        elementToFreeze.delete = function () { die(1) }
        elementToFreeze.clear = function () { die(1) }
        return elementToFreeze
      case 'map':
        const freezedMap = new Map()
        elementToFreeze.forEach((value, key) => {
          freezedMap.set(key, freezeDeep(value))
        })
        freezedMap.set = function () { die(1) }
        freezedMap.remove = function () { die(1) }
        return freezedMap
      default:
        return elementToFreeze
    }
  }

  const produce = (baseState, callback) => {
    const cloned = cloneDeep(baseState)
    if (typeCheck(callback) === 'undefined') {
      return cloned
    }
    if (typeCheck(callback) === 'object') {
      return freezeDeep(Object.assign(cloned, callback))
    }
    if (typeCheck(cloned) === 'array' && typeCheck(callback) === 'array') {
      return [...cloned, ...callback]
    }
    callback(cloned)
    return freezeDeep(cloned)
  }

  const cloneArray = (elementToClone) => elementToClone.map(cloneDeep)

  const cloneObject = (elementToClone) => Object.fromEntries(
    Object.keys(elementToClone).map(key => {
      return [key, cloneDeep(elementToClone[key])]
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
    return clonedSet
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
