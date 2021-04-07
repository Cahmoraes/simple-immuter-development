export const si = (() => {

  const errors = new Map([
    [1, 'This object has been frozen and should not be mutated'],
    [2, 'baseState and producer are incompatibles']
  ])

  const die = (errorNumber) =>
    console.log(errors.get(errorNumber))

  const pipe = (...fns) => (value) => 
    fns.reduce((acc, fn) => fn(acc), value)

  const flat = (element, depth = Infinity) => {
    if (typeCheck(element) !== 'array') return element
    return depth > 0 ? 
      element.reduce((flatArray, array) => flatArray.concat(flat(array, --depth)), []) :
      element
  }
  
  const createObjectfromEntries = (entries) => Object.fromEntries(entries)

  const getKeysFromObject = (object) => Object.keys(object)

  const immuterSet = (setToImmuter) => {
    setToImmuter.add = function () { die(1) }
    setToImmuter.delete = function () { die(1) }
    setToImmuter.clear = function () { die(1) }
    return setToImmuter
  }

  const immuterMap = (mapToImmuter) => {
    mapToImmuter.set = function () { die(1) }
    mapToImmuter.delete = function () { die(1) }
    mapToImmuter.clear = function () { die(1) }
    return mapToImmuter
  }

  const setPrototypeOf = (prototype) => (object) =>
    Object.setPrototypeOf(object, prototype)

  const typeCheck = (elementToCheck) => {
    const stringType = Object.prototype.toString.call(elementToCheck)
    return stringType.substring(
      stringType.indexOf(' ') + 1,
      stringType.indexOf(']')
    ).toLowerCase()
  }

  const isArray = (state) => typeCheck(state) === 'array'
  const isObject = (state) => typeCheck(state) === 'object'

  const everyArray = states => states.every(isArray)
  const everyObject = states => states.every(isObject)

  const freeze = (object) => Object.freeze(object)

  const isPrimitive = (elementToCheck) => 
    elementToCheck !== Object(elementToCheck)

  const freezeDeep = (elementToFreeze) => {
    switch(typeCheck(elementToFreeze)) {
      case 'object':
        const proto = Object.getPrototypeOf(elementToFreeze)
        return pipe(
          createObjectfromEntries,
          setPrototypeOf(proto),
          freeze
        )(
          getKeysFromObject(elementToFreeze)
            .map(key => [key, freezeDeep(elementToFreeze[key])])
        )
      case 'array':
        return Object.freeze(elementToFreeze.map(freezeDeep))
      case 'set':
        return immuterSet(elementToFreeze)
      case 'map':
        const freezedMap = new Map()
        elementToFreeze.forEach((value, key) => {
          freezedMap.set(key, freezeDeep(value))
        })
        return immuterMap(freezedMap)
      default:
        return elementToFreeze
    }
  }

  const produce = (baseState, producer, ...states) => {
    const cloned = cloneDeep(baseState)
    if (typeCheck(producer) === 'undefined') {
      return freezeDeep(cloned)
    }
    if(typeCheck(producer) === 'function') {
      producer(cloned)
      return freezeDeep(cloned)
    }
    if (states.length > 0) {
      if (typeCheck(baseState) === 'object' && typeCheck(producer) === 'object' && everyObject(states)) {
        return freezeDeep(Object.assign(cloned, producer, ...states))
      }
      if (typeCheck(cloned) === 'array' && typeCheck(producer) === 'array' && everyArray(states)) {
        return freezeDeep([...cloned, ...producer, ...flat(states)])
      }
    }
    if (typeCheck(baseState) === 'object' && typeCheck(producer) === 'object') {
      return freezeDeep(Object.assign(cloned, producer))
    }
    if (typeCheck(cloned) === 'array' && typeCheck(producer) === 'array') {
      return freezeDeep([...cloned, ...producer])
    }
    if (typeCheck(cloned) !== typeCheck(producer)) {
      throw new Error(errors.get(2))
    }
  }

  const cloneArray = (elementToClone) => elementToClone.map(cloneDeep)

  const cloneObject = (elementToClone) => {
    const proto = Object.getPrototypeOf(elementToClone)
    return pipe(
      createObjectfromEntries,
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
