export const si = (() => {

  const errors = new Map([
    [1, 'This object has been frozen and should not be mutated'],
    [2, 'baseState and producer are incompatibles']
  ])

  const die = (errorNumber) => () =>
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
    setToImmuter.add = die(1)
    setToImmuter.delete = die(1)
    setToImmuter.clear = die(1)
    return setToImmuter
  }

  const immuterMap = (mapToImmuter) => {
    mapToImmuter.set = die(1)
    mapToImmuter.delete = die(1)
    mapToImmuter.clear = die(1)
    return mapToImmuter
  }

  const setPrototypeOf = (prototype) => (object) =>
    Object.setPrototypeOf(object, prototype)

  const getPrototypeOf = (object) =>
    Object.getPrototypeOf(object)

  const typeCheck = (elementToCheck) => {
    const stringType = Object.prototype.toString.call(elementToCheck)
    return stringType.substring(
      stringType.indexOf(' ') + 1,
      stringType.indexOf(']')
    ).toLowerCase()
  }

  const isArray = (state) => typeCheck(state) === 'array'
  
  const isObject = (state) => typeCheck(state) === 'object'

  const isFunction = (state) => typeCheck(state) === 'function'
  
  const isUndefined = (state) => typeCheck(state) === 'undefined'

  const areDifferents = (...types) => {
    for (let j = 0, i = j + 1; i < types.length; i = j + 1, j++) {
      if (typeCheck(types[j]) !== typeCheck(types[i])) {
        return true
      }
    }
    return false
  }

  const everyArray = states => states.every(isArray)

  const everyObject = states => states.every(isObject)

  const areAll = (type) => (...objs) => 
    objs.every(obj => typeCheck(obj) === type)

  const areAllObjects = areAll('object')

  const areAllArrays = areAll('array')

  const freeze = (object) => Object.freeze(object)

  const freezeDeep = (elementToFreeze) => {
    switch(typeCheck(elementToFreeze)) {
      case 'object':
        return pipe(
          createObjectfromEntries,
          setPrototypeOf(getPrototypeOf(elementToFreeze)),
          freeze
        )(
          getKeysFromObject(elementToFreeze)
            .map(key => [key, freezeDeep(elementToFreeze[key])])
        )
      case 'array':
        return freeze(elementToFreeze.map(freezeDeep))
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
    const clonedBaseState = cloneDeep(baseState)
    if (isUndefined(producer)) {
      return freezeDeep(clonedBaseState)
    }
    if(isFunction(producer)) {
      producer(clonedBaseState)
      return freezeDeep(clonedBaseState)
    }
    if (states.length > 0) {
      if (areAllObjects(clonedBaseState, producer, states) && everyObject(states)) {
        return freezeDeep(Object.assign(clonedBaseState, producer, ...states))
      }
      if (areAllArrays(clonedBaseState, producer, states) && everyArray(states)) {
        return freezeDeep([...clonedBaseState, ...producer, ...flat(states, 1)])
      }
    }
    if (areAllObjects(clonedBaseState, producer)) {
      return freezeDeep(Object.assign(clonedBaseState, producer))
    }
    if (areAllArrays(clonedBaseState, producer)) {
      return freezeDeep([...clonedBaseState, ...producer])
    }
    if (areDifferents(clonedBaseState, producer)) {
      throw new Error(errors.get(2))
    }
  }

  const cloneArray = (elementToClone) => elementToClone.map(cloneDeep)

  const cloneObject = (elementToClone) => {
    const prototype = Object.getPrototypeOf(elementToClone)
    return pipe(
      createObjectfromEntries,
      setPrototypeOf(prototype)
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
    return clonedMap
  }

  const cloneSet = (elementToClone) => {
    const clonedSet = new Set()
    elementToClone.forEach((value) => clonedSet.add(cloneDeep(value)))
    return clonedSet
  }

  const cloneDeep = (element) => {  
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
