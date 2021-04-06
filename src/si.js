export const si = (() => {

  const errors = new Map([
    [1, "This object has been frozen and should not be mutated"]
  ])

  const die = (errorNumber) =>
    console.log(errors.get(errorNumber))

  const pipe = (...fns) => (value) => 
    fns.reduce((acc, fn) => fn(acc), value)
  
  const fromEntries = (entries) => Object.fromEntries(entries)

  const getKeysFromObject = (object) => Object.keys(object)

  const setPrototypeOf = (prototype) => (object) =>
    Object.setPrototypeOf(object, prototype)

  const typeCheck = (elementToCheck) => {
    const stringType = Object.prototype.toString.call(elementToCheck)
    return stringType.substring(
      stringType.indexOf(' ') + 1,
      stringType.indexOf(']')
    ).toLowerCase()
  }

  const freeze = (object) => Object.freeze(object)

  const isPrimitive = (elementToCheck) => 
    elementToCheck !== Object(elementToCheck)

  const freezeDeep = (elementToFreeze) => {
    switch(typeCheck(elementToFreeze)) {
      case 'object':
        const proto = Object.getPrototypeOf(elementToFreeze)
        return pipe(
          fromEntries,
          setPrototypeOf(proto),
          freeze
        )(
          getKeysFromObject(elementToFreeze)
            .map(key => [key, freezeDeep(elementToFreeze[key])])
        )
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
        freezedMap.delete = function () { die(1) }
        freezedMap.clear = function () { die(1) }
        return freezedMap
      default:
        return elementToFreeze
    }
  }

  const produce = (baseState, producer) => {
    const cloned = cloneDeep(baseState)
    if (typeCheck(producer) === 'undefined') {
      return freezeDeep(cloned)
    }
    if (typeCheck(producer) === 'object') {
      return freezeDeep(Object.assign(cloned, producer))
    }
    if (typeCheck(cloned) === 'array' && typeCheck(producer) === 'array') {
      return freezeDeep([...cloned, ...producer])
    }
    producer(cloned)
    return freezeDeep(cloned)
  }

  const cloneArray = (elementToClone) => elementToClone.map(cloneDeep)

  const cloneObject = (elementToClone) => {
    const proto = Object.getPrototypeOf(elementToClone)
    return pipe(
      fromEntries,
      setPrototypeOf(proto)
    )(
      getKeysFromObject(elementToClone)
      .map(key => [key, cloneDeep(elementToClone[key])])
    )
  }

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
