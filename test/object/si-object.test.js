const assert = require('assert')
const { it, describe } = require('mocha')
const si = require('../../src/build/index')
const peopleMock = require('../mock/people.json')
const typeCheck = require('../utils/typeCheck')

describe('Simple Immuter - Object', () => {
  
  let person = peopleMock[0]

  describe('si.produce(object)', () => {

    
    describe('baseState = object', () => {
      let nextState = si.produce(person)

      it('should return the same element if baseState to be a primitive type', () => {
        const primitiveElement = 'primitiveElement'
        const nextState = si.produce(primitiveElement)
        assert.strictEqual(primitiveElement, nextState)
      })

      it('should receive an object and return an new object with the same properties', () => {
        assert.deepStrictEqual(nextState, person)
      })

      it('should make a deep clone to array with same properties and structure', () => {
        const depthObject = ({
          ...person,
          address: {
            ...person.address,
            street: {
              name: 'Baker'
            }
          }
        })
        const nextState = si.produce(depthObject)
        assert.deepStrictEqual(nextState, depthObject)
      })

      it('should return the same type of baseState', () => {
        assert.ok(typeCheck(nextState) === typeCheck(person))
      })

      it('should return an new object in another memory address', () => {
        assert.notStrictEqual(nextState, person)
      })

      it('should change property at newState', () => {
        nextState.name = 'teste'
        assert.deepStrictEqual(nextState.name, person.name)
      })

      it('should not add property at newState', () => {
        nextState.prop = 'teste'
        assert.ok(!Reflect.has(nextState, 'prop'))
      })

      it('should not remove property at newState', () => {
        assert.ok(!Reflect.deleteProperty(nextState, 'name'))
        assert.ok(Reflect.has(nextState, 'name'))
      })

      it('should return freeze Object', () => {
        assert.ok(Object.isFrozen(nextState))
      })

    })

    describe('si.produce(object, producer)', () => {
      it('should not return draftState equals baseState', () => {
        const nextState = si.produce(person, () => {})
        assert.notStrictEqual(nextState, person)
      })
  
      it('should remove 1 element at nextState', () => {
        const nextState = si.produce(person, draftState => {
          Reflect.deleteProperty(draftState, 'name')
        })
        assert.ok(!Reflect.has(nextState, 'name'))
      })

      it('should add 1 element at nextState', () => {
        const nextState = si.produce(person, draftState => {
          draftState.teste = 'teste'
        })
        assert.ok(Reflect.has(nextState, 'teste'))
      })

      it('should return properties in new memory address', () => {
        const nextState = si.produce(person, () => {})
        assert.ok(Reflect.has(nextState, 'address'))
        assert.ok(nextState.address !== person.address)
      })
  
      it('should return the same properties content', () => {
        const nextState = si.produce(person, () => {})
        assert.ok(Reflect.has(nextState, 'address'))
        assert.deepStrictEqual(nextState.address, person.address)
      })

      it('should not change baseState', () => {
        const copyBaseState = {...person}
        si.produce(person, draftState => {
          Reflect.deleteProperty(draftState, 'name')
        })
        assert.ok(Reflect.has(person, 'name'))
        assert.deepStrictEqual(copyBaseState, person)
      })
    })

  })

  describe('si.produce(object, object2, ...objectN)', () => {
    it('should merge 2 objects', () => {
      const vehicles = { vehicles: ['car', 'motocyle'] }
      const nextState = si.produce(person, vehicles)
      assert.deepStrictEqual(nextState, {...person, ...vehicles})
    })

    it('should return a new object', () => {
      const vehicles = { vehicles: ['car', 'motocyle'] }
      const nextState = si.produce(person, vehicles)
      assert.notStrictEqual(nextState, person)
    })

    it('should merge 2 or more objects', () => {
      const vehicles = { vehicles: ['car', 'motocyle'] }
      const bolt = { pet: 'Bolt' }
      const nextState = si.produce(person, vehicles, bolt)
      assert.deepStrictEqual(nextState, {...person, ...vehicles, ...bolt})
    })

    it('should throw error if second parameter to be different of baseState', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const error = new Error('baseState and producer are incompatibles')
      assert.throws(() => si.produce(person, people), error)
    })

    it('should return undefined if any parameter to be different of baseState', () => {
      const person = { name: 'caique' }
      const age = { age: 28 }
      const hobbies = ['books', 'music']
      const nextState = si.produce(person, age, hobbies, 'non-object')
      assert.ok(nextState === undefined)
    })

    it('should maintain the legacy prototype', () => {
      class Human {
        constructor (sex) {
          this.sex = sex
        }
      }

      class Person extends Human {
        constructor (name, age, sex) {
          super(sex)
          Object.assign(this, { name, age })
        }
      }

      const nextState = si.produce(new Person('caique', 27, 'M'))
      assert.ok(nextState instanceof Person && nextState instanceof Human)
    })

  })
})
